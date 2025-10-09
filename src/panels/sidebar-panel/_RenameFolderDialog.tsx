import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { CollectionItemType } from "@/types/types";
import { useForm } from "@mantine/form";
import type { DialogProps } from "@radix-ui/react-dialog";

type RenameItemDialogProps = DialogProps & {
  title: string;
  itemSelected?: CollectionItemType;
  onOk: (newName: string) => void;
};

export const RenameFolderDialog = ({
  title,
  itemSelected,
  onOk,
  ...props
}: RenameItemDialogProps) => {
  const form = useForm({
    initialValues: { name: itemSelected?.name || "" },
  });
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.onSubmit((values) => {
            onOk(values.name.trim());
            props.onOpenChange?.(false);
          })}
        >
          <div>
            <Input {...form.getInputProps("name")} />
          </div>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => props.onOpenChange?.(false)}
            >
              Cancel
            </Button>
            <Button type="submit">OK</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
