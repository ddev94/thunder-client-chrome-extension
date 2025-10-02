import { useMemo, useState } from "react";
import { useCollection } from "./use-collection";

export const useRequestBody = () => {
  const [jsonError, setJsonError] = useState<string | null>(null);
  const { item, updateRequestItemById } = useCollection();
  const body = useMemo(() => {
    return item?.request?.body || "{}";
  }, [item]);
  const validateJson = (value: string) => {
    if (!value.trim()) {
      setJsonError(null);
      return;
    }

    try {
      JSON.parse(value);
      setJsonError(null);
    } catch (error) {
      if (error instanceof Error) {
        setJsonError(error.message);
      } else {
        setJsonError("Invalid JSON syntax");
      }
    }
  };

  const handleChange = (value: string) => {
    updateRequestItemById({
      body: value,
    });
    validateJson(value);
  };

  return {
    body,
    jsonError,
    handleChange,
    validateJson,
  };
};
