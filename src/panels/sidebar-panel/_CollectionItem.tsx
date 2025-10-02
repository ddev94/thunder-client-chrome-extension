import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch } from "@/hooks/use-store";
import { addNewItem } from "@/store/slices/app.slice";
import type { CollectionItemType } from "@/types/types";
import { EditIcon, Ellipsis, PlusCircle } from "lucide-react";
import { useState } from "react";
type CollectionItemProps = {
  item: CollectionItemType;
};
export function CollectionItem({ item }: CollectionItemProps) {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const menuItems = [
    {
      name: "http_request",
      icon: <PlusCircle size={18} />,
      label: "HTTP Request",
    },
    { name: "rename", icon: <EditIcon size={18} />, label: "Rename" },
  ];

  const menuItemsFiltered =
    item.type === "request"
      ? menuItems.filter((mi) => mi.name !== "http_request")
      : menuItems;
  const handleMenuItemClick = (name: string) => {
    if (name === "http_request") {
      dispatch(
        addNewItem({
          parentId: item.id,
          newItem: {
            id: crypto.randomUUID(),
            name: "New Request",
            type: "request",
            request: {
              url: "",
              method: "GET",
              headers: [],
              body: "{}",
            },
          },
        })
      );
    } else if (name === "rename") {
      // Handle renaming
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
