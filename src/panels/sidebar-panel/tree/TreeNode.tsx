import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCollection } from "@/hooks/use-collection";
import { cn } from "@/lib/utils";
import { ChevronDown, Edit, Plus, Trash2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { MethodRenderer } from "./MethodRenderer";
import { useTreeContext } from "./TreeContext";
import type { FlatNode } from "./types";

type TreeNodeProps = {
  node: FlatNode;
  onClick: (node: FlatNode) => void;
  onMove: ({
    dragId,
    parentId,
    index,
  }: {
    dragId: string;
    parentId: string | null;
    index: number;
  }) => void;
};

export function TreeNode({ node, onClick, onMove }: TreeNodeProps) {
  const {
    dropId,
    data,
    expanededIds,
    onDragStart,
    onDragEnd,
    onDrop,
    onDragEnter,
    onDragOver,
    onDragLeave,
    updateExpandedIds,
  } = useTreeContext();

  const [isRenaming, setIsRenaming] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { addHttpRequest, addFolder, deleteItem, updateName } = useCollection();

  const renameInputRef = useRef<HTMLInputElement>(null);

  const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", node.id);
    e.dataTransfer.effectAllowed = "move";
    onDragStart(node.id);
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dragId = e.dataTransfer.getData("text/plain");
    const parentId = node.parent ? node.parent.id : null;
    let index = -1;
    if (parentId) {
      index = data
        .filter((n) => n.parent?.id === parentId)
        .findIndex((n) => n.id === node.id);
    } else {
      index = data.filter((n) => !n.parent).findIndex((n) => n.id === node.id);
    }
    onMove({ dragId, parentId, index });
    onDrop(dragId, node.id);
  };

  const handleOnDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDragEnter(node.id);
  };

  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    onDragOver(node.id);
  };

  const handleOnDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDragEnd(node.id);
  };

  const handleOnDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDragLeave(node.id);
  };

  const handleAddHttpRequest = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setMenuOpen(false);
    e.preventDefault();
    e.stopPropagation();
    addHttpRequest(node.id);
  };
  const handleAddFolder = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setMenuOpen(false);
    addFolder(node.id);
  };

  const handleDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    deleteItem(node.id);
  };
  const method = node?.request?.method || "GET";

  const handleUpdateName = (newName?: string) => {
    if (!newName) {
      renameInputRef.current!.value = node.name;
      return;
    }
    updateName(node.id, newName);
  };
  const paddingLeft = 16 + node.level * 24;

  const style = { paddingLeft: paddingLeft };

  const isOpen = useMemo(() => {
    return expanededIds.has(node.id);
  }, [expanededIds]);

  const isHidden = useMemo(() => {
    let nodeId = node.id;
    while (true) {
      const node = data.find((n) => n.id === nodeId);
      if (node && node.parent) {
        if (!expanededIds.has(node.parent.id)) {
          return true;
        }
        nodeId = node.parent.id;
      } else {
        break;
      }
    }
    return false;
  }, [expanededIds]);

  const isFolder = node.type === "folder";

  const menuItemClass =
    "cursor-pointer flex items-center py-1 px-2 rounded space-x-2 hover:bg-accent hover:text-accent-foreground transition-all";

  return (
    <div
      key={node.id}
      className={cn(
        "cursor-pointer group select-none flex hover:bg-accent/60 py-1 px-4 items-center justify-between space-x-2 border-b border-b-2 border-transparent",
        {
          hidden: isHidden,
          "border-primary": dropId === node.id,
        }
      )}
      onClick={() => {
        onClick(node);
        updateExpandedIds(node.id);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setMenuOpen(true);
      }}
      style={style}
      draggable={true}
      onDragStart={handleOnDragStart}
      onDragEnter={handleOnDragEnter}
      onDragOver={handleOnDragOver}
      onDrop={handleOnDrop}
      onDragEnd={handleOnDragEnd}
      onDragLeave={handleOnDragLeave}
    >
      <div className="flex space-x-2">
        <div>
          {isFolder ? isOpen ? "📂" : "📁" : <MethodRenderer method={method} />}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsRenaming(false);
            handleUpdateName(renameInputRef.current?.value);
          }}
        >
          <input
            ref={renameInputRef}
            className="border-none bg-transparent outline-none truncate"
            defaultValue={node.name}
            readOnly={!isRenaming}
          />
        </form>
      </div>
      <Popover open={menuOpen} onOpenChange={setMenuOpen}>
        <PopoverTrigger
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <div
            className={cn(
              "opacity-0 group-hover:opacity-100 border border-transparent rounded p-1 hover:bg-accent hover:text-accent-foreground cursor-pointer",
              menuOpen && "opacity-100"
            )}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
          >
            <ChevronDown size={16} />
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 p-1"
          align="start"
          sideOffset={0}
          alignOffset={10}
        >
          {isFolder && (
            <div className={cn(menuItemClass)} onClick={handleAddHttpRequest}>
              <Plus size={18} /> <span>Http Request</span>
            </div>
          )}
          {isFolder && (
            <div className={cn(menuItemClass)} onClick={handleAddFolder}>
              <Plus size={18} /> <span>New Folder</span>
            </div>
          )}
          <div
            className={cn(menuItemClass)}
            onClick={(e) => {
              setIsRenaming(true);
              renameInputRef.current?.focus();
              renameInputRef.current?.select();
              e.stopPropagation();
              setMenuOpen(false);
            }}
          >
            <Edit size={18} /> <span>Rename</span>
          </div>
          <div className={cn(menuItemClass)} onClick={handleDelete}>
            <Trash2 size={18} /> <span>Delete</span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
