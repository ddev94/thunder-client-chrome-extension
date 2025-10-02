import { JsonViewer } from "@/components/extra/json-tree-viewer";
import { RequestStatus, useRequest } from "@/request.provider";
import { useMemo } from "react";

export function ResponseTab() {
  const { response } = useRequest();
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
      {body && isJSON && response?.status === RequestStatus.Fulfilled && (
        <JsonViewer data={body} rootName="" />
      )}
      {body && !isJSON && response?.status === RequestStatus.Fulfilled && (
        <pre className="whitespace-pre-wrap break-all">{body}</pre>
      )}
    </div>
  );
}
