import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { CollectionItemType } from "@/types/types";
import type { DialogProps } from "@radix-ui/react-dialog";

type DeleteItemAlertProps = DialogProps & {
  itemSelected?: CollectionItemType;
  onOk: () => void;
};

export const DeleteItemAlert = ({ itemSelected, onOk, ...props }: DeleteItemAlertProps) => {
  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Request</AlertDialogTitle>
        </AlertDialogHeader>
        <div>Do you really want to delete "{itemSelected?.name}"?</div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onOk}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
