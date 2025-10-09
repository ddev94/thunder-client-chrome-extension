import { useCollection } from "@/hooks/use-collection";
import { findNestedItemById, removeNestedItemById } from "@/lib/array";
import { useEffect, useState } from "react";
import useResizeObserver from "use-resize-observer";
import { TreeNodeControl } from "./_TreeNodeControl";
import { Tree } from "./tree/Tree";
import type { FlatNode, TreeNode } from "./tree/types";

export function TreeView() {
  const { collections, updateSortPosition, updateCurrentItemId } =
    useCollection();

  const [data, setData] = useState<TreeNode[]>([]);

  const { ref,} = useResizeObserver();
  const handleOnMove = ({
    dragId,
    parentId,
    index,
  }: {
    dragId: string;
    parentId: string | null;
    index: number;
  }) => {
    console.log(dragId, parentId, index);
    const sourceItem = findNestedItemById<TreeNode>(data, dragId);
    if (!sourceItem) return;
    let newData = removeNestedItemById<TreeNode>(data, dragId);
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
    updateSortPosition(newData as any);
  };

  const handleOnSelect = (node: FlatNode) => {
    console.log("Selected node:", node);
    if (node.type !== "folder") {
      updateCurrentItemId(node.id);
    }
  };
  useEffect(() => {
    if (collections) {
      setData(JSON.parse(JSON.stringify(collections || [])));
    }
  }, [collections]);
  return (
    <div className="h-full w-full overflow-y-auto" ref={ref}>
      <Tree data={data} onMove={handleOnMove} onSelect={handleOnSelect} />
      <TreeNodeControl />
    </div>
  );
}
