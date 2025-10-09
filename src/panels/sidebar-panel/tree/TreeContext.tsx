import { createContext, useContext, useState } from "react";
import type { FlatNode } from "./types";
import { isParent } from "./utils";


type TreeContextType = {
  dragId: string;
  dropId: string;
  data: FlatNode[];
  expanededIds: Set<string>;
  onDragStart: (id: string) => void;
  onDragEnd: (id: string) => void;
  onDrop: (sourceId: string, targetId: string) => void;
  onDragEnter: (id: string) => void;
  onDragOver: (id: string) => void;
  onDragLeave: (id: string) => void;
  updateExpandedIds: (id: string) => void;
};


const TreeContext = createContext<TreeContextType>({} as TreeContextType);

export const TreeProvider = ({
  data,
  children,
}: {
  data: FlatNode[];
  children: React.ReactNode;
}) => {
  const [dragId, setDragId] = useState("");
  const [dropId, setDropId] = useState("");
  const [expanededIds, setExpandedIds] = useState<Set<string>>(new Set());
  const onDragStart = (id: string) => {
    setDragId(id);
  };

  const onDragEnd = () => {
    setDragId("");
    setDropId("");
  };

  const onDrop = (sourceId: string, targetId: string) => {
    console.log("onDrop", sourceId, targetId);
    setDragId("");
    setDropId("");
  };

  const onDragEnter = (id: string) => {
    if (isParent(data, dragId, id)) return;
    setDropId(id);
  };

  const onDragOver = () => {
    // setDropId("");
  };
  const onDragLeave = (id: string) => {
    if (dropId === id) {
      // setDropId("");
    }
  };
  return (
    <TreeContext.Provider
      value={{
        dragId,
        dropId,
        data,
        expanededIds,
        onDragStart,
        onDragEnd,
        onDrop,
        onDragEnter,
        onDragOver,
        onDragLeave,
        updateExpandedIds: (id: string) => {
          if (expanededIds.has(id)) {
            expanededIds.delete(id);
          } else {
            expanededIds.add(id);
          }
          setExpandedIds(new Set(expanededIds));
        },
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

export const useTreeContext = () => useContext(TreeContext);