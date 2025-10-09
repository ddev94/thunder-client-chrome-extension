import { useEffect, useState } from "react";
import { TreeProvider } from "./TreeContext";
import { TreeNode } from "./TreeNode";
import type { FlatNode, TreeNode as TreeNodeType } from "./types";
import { flattenNodes } from "./utils";

type TreeViewProps = {
  data: TreeNodeType[];
  onMove: ({
    dragId,
    parentId,
    index,
  }: {
    dragId: string;
    parentId: string | null;
    index: number;
  }) => void;
  onSelect: (node: FlatNode) => void;
};

export function Tree({ data, onSelect, onMove }: TreeViewProps) {
  const [nodes, setNodes] = useState<FlatNode[]>([]);
  const handleOnclick = (node: FlatNode) => {
    setNodes((prevNodes) => {
      const newNodes = prevNodes.map((n) =>
        n.parent?.id === node.id ? { ...n, open: !n.open } : n
      );
      return [...newNodes];
    });
    onSelect(node);
  };

  useEffect(() => {
    setNodes(flattenNodes(data));
  }, [data]);
  return (
    <TreeProvider data={nodes}>
      {nodes.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          onClick={handleOnclick}
          onMove={onMove}
        />
      ))}
    </TreeProvider>
  );
}
