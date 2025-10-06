import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CollectionItemType } from "@/types/types";
import { useForm } from "@mantine/form";
import type { DialogProps } from "@radix-ui/react-dialog";

type RenameItemDialogProps = DialogProps & {
  title: string;
  itemSelected?: CollectionItemType;
  onOk: (newName: string) => void;
};

export const FolderNameDialog = ({
  title,
  itemSelected,
  onOk,
  ...props
}: RenameItemDialogProps) => {
  const form = useForm({
    initialValues: { name: itemSelected?.name || "" },
  });
  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <form
          onSubmit={form.onSubmit((values) => {
            onOk(values.name.trim());
            props.onOpenChange?.(false);
          })}
        >
          <div>
            <Input {...form.getInputProps("name")} />
          </div>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type="submit">OK</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
