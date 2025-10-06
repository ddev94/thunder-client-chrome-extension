import { CollectionActionButtons } from "./_CollectionActionButtons";
import { CollectionsFilter } from "./_CollectionsFilter";

export function CollectionHeader() {
  return (
    <div className="flex items-center py-4 px-4 space-x-2 justify-between">
      <CollectionsFilter />
      <CollectionActionButtons />
    </div>
  );
}
