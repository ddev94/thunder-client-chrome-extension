import type { FlatNode, TreeNode } from "./types";

export function isParent(flatNodes: FlatNode[], parentId: string, id: string) {
  const node = flatNodes.find((n) => n.id === id);
  if (!node) return false;
  if (node.parent?.id === parentId) return true;
  if (node.parent) return isParent(flatNodes, parentId, node.parent.id);
  return false;
}

export function flattenNodes(
  data: TreeNode | TreeNode[],
  level: number = 0,
  result: FlatNode[] = [],
  parent: TreeNode | null = null
): FlatNode[] {
  // Handle array input
  if (Array.isArray(data)) {
    data.forEach((item) => flattenNodes(item, level, result, parent));
    return result;
  }

  // Handle object with node properties
  if (data && typeof data === "object") {
    // Add current node to result with its level
    const node: FlatNode = {
      id: data.id,
      name: data.name,
      type: data.type,
      level: level,
      parent: parent,
      open: !parent ? true : false, // Root nodes are open by default
    };

    // Include request data if it exists
    if (data.request) {
      node.request = data.request;
    }

    result.push(node);

    // Recursively process children if they exist
    if (data.children && Array.isArray(data.children)) {
      data.children.forEach((child) => {
        flattenNodes(child, level + 1, result, data);
      });
    }
  }

  return result;
}
