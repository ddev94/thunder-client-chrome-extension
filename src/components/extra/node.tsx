import { cn } from "@/lib/utils";
import type { NodeRendererProps } from "react-arborist";

export const Node = ({ node, style, dragHandle }: NodeRendererProps<any>) => {
  const onNodeClick = () => {
    if (node.isInternal) {
      node.toggle();
    }
    if (node.isLeaf) {
      node.select()
    }
  };
  return (
    <div
      style={style}
      ref={dragHandle}
      className={cn(
        "space-x-2 truncate flex items-center cursor-pointer select-none",
      )}
      onClick={onNodeClick}
    >
      <span>{node.isLeaf ? "📄" : node.isOpen ? "📂" : "📁"}</span>
      <span className="truncate">{node.data.name}</span>
    </div>
  );
};
