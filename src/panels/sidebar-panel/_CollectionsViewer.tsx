import { ReactTreeView } from "@/components/extra/react-tree-view";
import { useCollection } from "@/hooks/use-collection";
import type { CollectionItemType, TreeDataItem } from "@/types/types";
import { useDisclosure } from "@mantine/hooks";
import { useMemo, useState } from "react";
import { DeleteItemAlert } from "./_DeleteItemAlert";
import { FolderNameDialog } from "./_FolderNameDialog";

export function CollectionsViewer() {
  const [deleteAlertOpen, deleteAlertOpenHandlers] = useDisclosure();
  const [renameDialogOpen, renameDialogOpenHandlers] = useDisclosure();
  const [itemSelected, setItemSelected] = useState<
    CollectionItemType | undefined
  >();
  const {
    currentItemId,
    collections,
    expandedItemIds,
    deleteItem,
    addItem,
    addFolder,
    updateExpandedItemIds,
    updateCurrentItemId,
    renameItem,
    onOrderChange,
  } = useCollection();

  console.log(collections);

  const data = useMemo<TreeDataItem[]>(() => {
    return JSON.parse(JSON.stringify(collections || []));
  }, [collections]);

  return (
    <>
      <ReactTreeView items={data} onSortEnd={onOrderChange} />
      {/* <TreeView
        data={data}
        expandedItemIds={expandedItemIds}
        onSelectChange={onSelectChange}
        selectedItemId={currentItemId as string}
        onDocumentDrag={(sourceItem, targetItem) => {
          console.log("onDocumentDrag", sourceItem, targetItem);
          onOrderChange(
            sourceItem as CollectionItemType,
            targetItem as CollectionItemType
          );
        }} // Disable document drag to prevent conflicts with dnd-kit
      /> */}
      <DeleteItemAlert
        open={deleteAlertOpen}
        onOpenChange={deleteAlertOpenHandlers.toggle}
        itemSelected={itemSelected}
        onOk={() => {
          if (itemSelected) {
            deleteItem(itemSelected.id);
          }
        }}
      />
      <FolderNameDialog
        title="Rename Folder"
        open={renameDialogOpen}
        onOpenChange={renameDialogOpenHandlers.toggle}
        itemSelected={itemSelected}
        onOk={(newName: string) => {
          if (itemSelected) {
            renameItem(itemSelected.id, newName);
          }
        }}
      />
    </>
  );
}
