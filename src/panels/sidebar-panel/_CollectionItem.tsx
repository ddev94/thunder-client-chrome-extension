import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { CollectionItemType } from "@/types/types";
import { EditIcon, Ellipsis, PlusCircle, TrashIcon } from "lucide-react";
import { useState } from "react";
type CollectionItemProps = {
  item: CollectionItemType;
  onDelete: () => void;
  onAddItem: () => void;
  onAddFolder: () => void;
  onRename: () => void;
};
export function CollectionItem({
  item,
  onAddItem,
  onAddFolder,
  onDelete,
  onRename,
}: CollectionItemProps) {
  const [open, setOpen] = useState(false);
  const menuItems = [
    {
      name: "http_request",
      icon: <PlusCircle size={18} />,
      label: "HTTP Request",
    },
    {
      name: "folder",
      icon: <PlusCircle size={18} />,
      label: "New Folder",
    },
    { name: "rename", icon: <EditIcon size={18} />, label: "Rename" },
    { name: "delete", icon: <TrashIcon size={18} />, label: "Delete" },
  ];

  const menuItemsFiltered =
    item.type === "request"
      ? menuItems.filter(
          (mi) =>
            mi.name !== "http_request" &&
            mi.name !== "folder" &&
            mi.name !== "rename"
        )
      : menuItems;
  const handleMenuItemClick = (name: string) => {
    if (name === "http_request") {
      onAddItem();
    } else if (name === "rename") {
      onRename();
    } else if (name === "folder") {
      onAddFolder();
    } else if (name === "delete") {
      onDelete();
    }
    setOpen(false);
  };
  return (
    <div className="flex items-center justify-between w-full pr-1">
      <span className="text-sm truncate">{item.name}</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            className="opacity-0 hover:bg-gray-300 rounded p-1 transition-all group-hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <Ellipsis size={16} />
          </div>
        </PopoverTrigger>
        <PopoverContent side="bottom" align="start" className="p-0 w-40">
          {menuItemsFiltered.map((item) => (
            <div
              key={item.label}
              className="flex text-sm items-center gap-2 cursor-pointer hover:bg-gray-200 rounded px-1 py-2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleMenuItemClick(item.name);
              }}
            >
              {item.icon} <span>{item.label}</span>
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
