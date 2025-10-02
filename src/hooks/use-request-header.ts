import { useDebouncedCallback } from "@mantine/hooks";
import { useMemo } from "react";
import { useCollection } from "./use-collection";

export const useRequestHeader = () => {
  const { updateRequestItemById, item } = useCollection();
  const headers = useMemo(() => {
    return item?.request?.headers || [];
  }, [item]);
  const addHeader = () => {
    if (!item) return;
    updateRequestItemById({
      headers: [...headers, { header: "", value: "", isDisabled: false }],
    });
  };
  const removeHeader = (index: number) => {
    const newHeaders = [...headers];
    newHeaders.splice(index, 1);
    updateRequestItemById({
      headers: newHeaders,
    });
  };
  const disableHeader = (index: number) => {
    const newHeaders = [...headers];
    newHeaders[index].isDisabled = !newHeaders[index].isDisabled;
    updateRequestItemById({
      headers: newHeaders,
    });
  };
  const onHeaderChange = useDebouncedCallback(
    (index: number, newHeader: string) => {
      const newHeaders = [...headers];
      newHeaders[index].header = newHeader;
      updateRequestItemById({
        headers: newHeaders,
      });
    },
    500
  );
  const onValueChange = useDebouncedCallback(
    (index: number, newValue: string) => {
      const newHeaders = [...headers];
      newHeaders[index].value = newValue;
      updateRequestItemById({
        headers: newHeaders,
      });
    },
    500
  );
  return {
    headers,
    addHeader,
    removeHeader,
    disableHeader,
    onHeaderChange,
    onValueChange,
  };
};
