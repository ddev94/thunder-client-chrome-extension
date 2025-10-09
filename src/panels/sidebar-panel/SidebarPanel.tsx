import { CollectionHeader } from "./_CollectionHeader";
import { TreeView } from "./_TreeView";

export function SidebarPanel() {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <CollectionHeader />
      <TreeView />
    </div>
  );
}
