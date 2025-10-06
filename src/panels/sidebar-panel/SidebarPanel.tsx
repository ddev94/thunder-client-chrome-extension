import { CollectionHeader } from "./_CollectionHeader";
import { CollectionsViewer } from "./_CollectionsViewer";

export function SidebarPanel() {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <CollectionHeader />
      <CollectionsViewer />
    </div>
  );
}
