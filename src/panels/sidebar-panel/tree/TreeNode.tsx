import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCollection } from "@/hooks/use-collection";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { updateExpanededItemIds } from "@/store/slices/app.slice";
import { ChevronDown, Edit, Move, Plus, Trash2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { MethodRenderer } from "./MethodRenderer";
import { useTreeContext } from "./TreeContext";
import type { FlatNode } from "./types";
import { isParent } from "./utils";

type TreeNodeProps = {
  node: FlatNode;
  onClick: (node: FlatNode) => void;
  onMove: ({
    dragId,
    dropId,
    parentId,
    index,
  }: {
    dragId: string;
    dropId: string;
    parentId: string | null;
    index: number;
  }) => void;
};

export function TreeNode({ node, onClick, onMove }: TreeNodeProps) {
  const {
    dropId,
    data,
    onDragStart,
    onDragEnd,
    onDrop,
    onDragEnter,
    onDragOver,
    onDragLeave,
  } = useTreeContext();

  const [isRenaming, setIsRenaming] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    addHttpRequest,
    addFolder,
    deleteItem,
    updateName,
    moveToRoot,
    currentItemId,
  } = useCollection();

  const dispatch = useAppDispatch();

  const expanededIds =
    useAppSelector((state) => state.app.expandedItemIds) || [];

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
    if (isParent(data, dragId, node.id)) return;
    if (parentId) {
      index = data
        .filter((n) => n.parent?.id === parentId)
        .findIndex((n) => n.id === node.id);
    } else {
      index = data.filter((n) => !n.parent).findIndex((n) => n.id === node.id);
    }
    onMove({ dragId, dropId: node.id, parentId, index });
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

  const handleMoveToRoot = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    setMenuOpen(false);
    moveToRoot(node.id);
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
    return expanededIds.includes(node.id);
  }, [expanededIds]);

  const isHidden = useMemo(() => {
    let nodeId = node.id;
    while (true) {
      const node = data.find((n) => n.id === nodeId);
      if (node && node.parent) {
        if (!expanededIds.includes(node.parent.id)) {
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
          "bg-accent/90": currentItemId === node.id,
        }
      )}
      onClick={() => {
        onClick(node);
        dispatch(updateExpanededItemIds(node.id));
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
            handleUpdateName(renameInputRef.current?.value);
            setTimeout(() => {
              setIsRenaming(false);
            }, 100);
          }}
        >
          <input
            ref={renameInputRef}
            className={cn("border-none bg-transparent outline-none", {
              hidden: !isRenaming,
            })}
            defaultValue={node.name}
          />
          <span className={cn({ hidden: isRenaming })}>{node.name}</span>
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
              (menuOpen || currentItemId === node.id) && "opacity-100"
            )}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
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
              e.preventDefault();
              e.stopPropagation();
              setIsRenaming(true);
              console.log(renameInputRef.current);
              setTimeout(() => {
                renameInputRef.current?.focus();
                // renameInputRef.current?.select();
              }, 100);

              setMenuOpen(false);
            }}
          >
            <Edit size={18} /> <span>Rename</span>
          </div>
          {node.parent && (
            <div className={cn(menuItemClass)} onClick={handleMoveToRoot}>
              <Move size={18} /> <span>Move to root</span>
            </div>
          )}
          <div className={cn(menuItemClass)} onClick={handleDelete}>
            <Trash2 size={18} /> <span>Delete</span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
