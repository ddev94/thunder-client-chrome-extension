import { JsonViewer } from "@/components/extra/json-tree-viewer";
import { useAppSelector } from "@/hooks/use-store";
import { useMemo } from "react";

export function ResponseTab() {
  const response = useAppSelector((state) => state.response.result);
  const body = useMemo(() => {
    try {
      return JSON.parse(response?.body || "");
    } catch (e) {
      return response?.body || "";
    }
  }, [response]);

  const isJSON = useMemo(() => {
    try {
      JSON.parse(response?.body || "");
      return true;
    } catch (e) {
      return false;
    }
  }, [response]);
  return (
    <div className="h-full overflow-auto">
      {body && isJSON && response?.status === "succeeded" && (
        <JsonViewer data={body} rootName="" />
      )}
      {body && !isJSON && response?.status === "succeeded" && (
        <pre className="whitespace-pre-wrap break-all">{body}</pre>
      )}
    </div>
  );
}
