import { useAppSelector } from "@/hooks/use-store";
import { LoaderCircleIcon } from "lucide-react";
import { ResponseStatusBar } from "./_ResponseStatusBar";
import { ResponseTabs } from "./_ResponseTabs";

export function ResponsePanel() {
  const response = useAppSelector((state) => state.response.result);

  if (!response?.status) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Send a request to see the response
      </div>
    );
  }

  if (response.status === "loading") {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <LoaderCircleIcon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-full p-4 flex flex-col overflow-hidden">
      <ResponseStatusBar className="mt-1" />
      <ResponseTabs className="flex-1 overflow-hidden mt-6" />
    </div>
  );
}
