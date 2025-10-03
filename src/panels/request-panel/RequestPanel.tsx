import { useCollection } from "@/hooks/use-collection";
import { RequestLine } from "./_RequestLine";
import { RequestTabs } from "./_RequestTabs";

export function RequestPanel() {
  const { item } = useCollection();
  if (!item?.id) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Select a request to start
      </div>
    );
  }
  return (
    <div className="h-full py-4 flex flex-col">
      <RequestLine />
      <RequestTabs className="mt-4 flex-1 overflow-hidden" />
    </div>
  );
}
