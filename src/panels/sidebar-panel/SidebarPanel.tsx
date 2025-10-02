import { CollectionsFilter } from "./_CollectionsFilter";
import { CollectionsViewer } from "./_CollectionsViewer";

export function SidebarPanel() {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <CollectionsFilter />
      <CollectionsViewer />
    </div>
  );
}
