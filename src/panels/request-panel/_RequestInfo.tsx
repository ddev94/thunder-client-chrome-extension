import { Input } from "@/components/ui/input";
import { useCollection } from "@/hooks/use-collection";
import { useDebouncedCallback } from "@mantine/hooks";
import { useEffect } from "react";

export const RequestInfo = () => {
  const { item, updateName } = useCollection();
  useEffect(() => {
    if (item?.name) {
      document.title = item.name + " - API Client";
    }
  }, [item])

  const handleOnChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateName(e.target.value);
  }, 300);
  return (
    <div className="px-4 mb-4 flex items-center gap-2">
      <Input
        defaultValue={item?.name || "Untitled Request"}
        className="border-none p-0 font-semibold text-xl! shadow-none"
        onChange={handleOnChange}
      />
    </div>
  );
};
