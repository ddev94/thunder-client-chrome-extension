import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import {
  setCurrentEditingItem,
  toggleRenameDialog,
} from "@/store/slices/app.slice";
import { RenameFolderDialog } from "./_RenameFolderDialog";

export function TreeNodeControl() {
  const app = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  return (
    <>
      <RenameFolderDialog
        open={app.renameDialogOpen}
        onOpenChange={() => {
          dispatch(toggleRenameDialog(false));
          dispatch(setCurrentEditingItem(null));
        }}
        title="Rename Folder"
        onOk={() => {}}
      />
    </>
  );
}
