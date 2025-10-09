import { useCollection } from "@/hooks/use-collection";
import { findNestedItemById, removeNestedItemById } from "@/lib/array";
import { useEffect, useState } from "react";
import useResizeObserver from "use-resize-observer";
import { TreeNodeControl } from "./tree/_TreeNodeControl";
import { Tree } from "./tree/Tree";
import type { FlatNode, TreeNode } from "./tree/types";

export function TreeView() {
  const { collections, updateSortPosition, updateCurrentItemId } =
    useCollection();

  const [data, setData] = useState<TreeNode[]>([]);

  const { ref } = useResizeObserver();
  const handleOnMove = ({
    dragId,
    dropId,
    parentId,
  }: {
    dragId: string;
    dropId: string;
    parentId: string | null;
    index: number;
  }) => {
    const sourceItem = findNestedItemById<TreeNode>(data, dragId);
    const dropSourceItem = findNestedItemById<TreeNode>(data, dropId);
    if (!sourceItem || !dropSourceItem) return;
    if (sourceItem.id === dropSourceItem.id) return;
    let newData = removeNestedItemById<TreeNode>(data, dragId);
    if (dropSourceItem.type === "folder") {
      const parentItem = findNestedItemById(newData, dropSourceItem.id);
      if (parentItem) {
        if (!parentItem.children) {
          parentItem.children = [];
        }
        parentItem.children.splice(0, 0, sourceItem);
      }
    } else {
      if (parentId) {
        const parentItem = findNestedItemById(newData, parentId);
        const dropIndex = parentItem?.children?.findIndex(
          (c) => c.id === dropId
        );
        if (parentItem && typeof dropIndex === "number" && dropIndex > -1) {
          if (!parentItem.children) {
            parentItem.children = [];
          }
          parentItem.children.splice(dropIndex + 1, 0, sourceItem);
        }
      } else {
        const index = newData.findIndex((d) => d.id === dropId);
        newData.splice(index + 1, 0, sourceItem);
      }
    }

    setData(newData);
    updateSortPosition(newData as any);
    // const sourceItem = findNestedItemById<TreeNode>(data, dragId);
    // const dropSourceItem = findNestedItemById<TreeNode>(data, dropId);
    // if (!sourceItem || !dropSourceItem) return;
    // let newData = removeNestedItemById<TreeNode>(data, dragId);
    // if (dropSourceItem?.type === "folder" && !parentId) {
    //   parentId = dropSourceItem.id;
    //   index = 0;
    // }
    // if (parentId) {
    //   const parentItem = findNestedItemById(newData, parentId);
    //   const dropIndex = parentItem?.children?.findIndex((c) => c.id === dropId);
    //   if (parentItem && typeof dropIndex === "number" && dropIndex > -1) {
    //     if (!parentItem.children) {
    //       parentItem.children = [];
    //     }
    //     parentItem.children.splice(dropIndex + 1, 0, sourceItem);
    //   }
    // } else {
    //   newData.splice(index, 0, sourceItem);
    // }
    // setData(newData);
    // updateSortPosition(newData as any);
  };

  const handleOnSelect = (node: FlatNode) => {
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
