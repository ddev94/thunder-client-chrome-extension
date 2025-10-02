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
    <div className="h-full p-4">
      <RequestLine />
      <RequestTabs className="mt-4" />
    </div>
  );
}
