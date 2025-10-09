import { useCollection } from "@/hooks/use-collection";

export const RequestInfo = () => {
  const { item } = useCollection();
  return (
    <div className="px-4 mb-4 flex items-center gap-2 font-semibold text-xl!">
      {item?.name}
    </div>
  );
};
