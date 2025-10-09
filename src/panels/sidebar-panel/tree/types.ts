import type { RequestType } from "@/types/types";

export interface FlatNode {
  id: string;
  name: string;
  type: "folder" | "request";
  level: number;
  parent: TreeNode | null;
  open?: boolean;
  request?: RequestType;
}

export interface TreeNode {
  id: string;
  name: string;
  type: "folder" | "request";
  children?: TreeNode[];
  request?: RequestType;
}

