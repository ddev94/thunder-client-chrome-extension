import { useDebouncedCallback } from "@mantine/hooks";
import { useMemo } from "react";
import { useCollection } from "./use-collection";

export const useRequestQuery = () => {
  const { item, updateRequestItemById } = useCollection();

  const queryParams = useMemo(() => {
    return item?.request?.queryParams || [];
  }, [item]);
  const addQueryParam = () => {
    updateRequestItemById({
      ...item,
      queryParams: [
        ...queryParams,
        { param: "", value: "", isDisabled: false },
      ],
    });
  };
  const removeQueryParam = (index: number) => {
    const newParams = [...queryParams];
    newParams.splice(index, 1);
    updateRequestItemById({
      ...item,
      queryParams: newParams,
    });
  };
  const disableQueryParam = (index: number) => {
    const newParams = [...queryParams];
    newParams[index] = {
      ...newParams[index],
      isDisabled: !newParams[index].isDisabled,
    };
    updateRequestItemById({
      ...item,
      queryParams: newParams,
    });
  };
  const onParamChange = useDebouncedCallback(
    (index: number, newParam: string) => {
      const newParams = [...queryParams];
      newParams[index] = {
        ...newParams[index],
        param: newParam,
      };
      updateRequestItemById({
        ...item,
        queryParams: newParams,
      });
    },
    500
  );
  const onValueChange = useDebouncedCallback(
    (index: number, newValue: string) => {
      const newParams = [...queryParams];
      newParams[index] = {
        ...newParams[index],
        value: newValue,
      };
      updateRequestItemById({
        ...item,
        queryParams: newParams,
      });
    },
    500
  );
  return {
    queryParams,
    addQueryParam,
    removeQueryParam,
    disableQueryParam,
    onParamChange,
    onValueChange,
  };
};
