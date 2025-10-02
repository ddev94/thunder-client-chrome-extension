import { RequestLine } from "./_RequestLine";
import { RequestTabs } from "./_RequestTabs";

export function RequestPanel() {
  return (
    <div className="h-full p-4">
      <RequestLine />
      <RequestTabs className="mt-4" />
    </div>
  );
}
