import { findNestedItemById, removeNestedItemById } from "@/lib/array";
import type { TreeDataItem } from "@/types/types";
import { useEffect, useState } from "react";
import { Tree } from "react-arborist";
import { Node } from "./node";

const _data: TreeDataItem[] = [
  { id: "1", name: "Unread" },
  { id: "2", name: "Threads" },
  {
    id: "3",
    name: "Chat Rooms",
    children: [
      { id: "c1", name: "General" },
      { id: "c2", name: "Random" },
      { id: "c3", name: "Open Source Projects" },
    ],
  },
  {
    id: "4",
    name: "Direct Messages",
    children: [
      { id: "d1", name: "Alice" },
      { id: "d2", name: "Bob" },
      { id: "d3", name: "Charlie" },
    ],
  },
];

type ReactTreeViewProps = {
  items?: TreeDataItem[];
  onSortEnd?: (items: TreeDataItem[]) => void;
};

export function ReactTreeView({ items, onSortEnd }: ReactTreeViewProps) {
  const [data, setData] = useState<TreeDataItem[]>(items || _data);
  const handleOnMove = ({
    dragIds,
    parentId,
    index,
  }: {
    dragIds: string[];
    parentId: string | null;
    index: number;
  }) => {
    const dragId = dragIds[0];
    const sourceItem = findNestedItemById<TreeDataItem>(data, dragId);
    if (!sourceItem) return;
    let newData = removeNestedItemById<TreeDataItem>(data, dragId);
    if (parentId) {
      const parentItem = findNestedItemById(newData, parentId);
      if (parentItem) {
        if (!parentItem.children) {
          parentItem.children = [];
        }
        parentItem.children.splice(index, 0, sourceItem);
      }
    } else {
      newData.splice(index, 0, sourceItem);
    }
    setData(newData);
    onSortEnd?.(newData);
  };
  useEffect(() => {
    if (items) {
      setData(items);
    }
  }, [items]);
  return (
    <Tree
      data={data}
      onMove={handleOnMove}
      onSelect={(e) => {
        console.log("onSelect", e);
      }}
      openByDefault={true}
      width="100%"
      className="h-full! w-full!"
      rowClassName="hover:bg-accent/20 px-4"
      rowHeight={32}
      initialOpenState={{ 3: true, 4: true }}
    >
      {Node}
    </Tree>
  );
}
