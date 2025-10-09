import type { RequestMethod } from "@/types/types";
import { useCollection } from "./use-collection";

export const useRequestMethod = () => {
  const methods = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"];
  const { item, updateRequestItemById } = useCollection();
  const onMethodChange = (newMethod: RequestMethod) => {
    if (!item) return;
    updateRequestItemById({
      method: newMethod,
    });
  };
  return {
    method: item?.request?.method || "GET",
    methods,
    onMethodChange,
  };
};
