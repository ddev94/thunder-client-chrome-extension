import { updateCollectionItemById } from "@/store/slices/app.slice";
import { useEffect, useMemo, useRef } from "react";
import { useCollection } from "./use-collection";
import { useAppDispatch, useAppSelector } from "./use-store";

export const useRequestUrl = () => {
  const { item, updateRequestItemById } = useCollection();
  const currentItemId = useAppSelector((state) => state.app.currentItemId);
  const dispatch = useAppDispatch();
  const urlRef = useRef<HTMLInputElement>(null);
  const setUrl = (newUrl: string) => {
    updateRequestItemById({
      ...item,
      url: newUrl,
    });
  };

  const url = useMemo(() => {
    return item?.request?.url || "";
  }, [item]);

  const onChange = (value: string) => {
    if (currentItemId) {
      dispatch(
        updateCollectionItemById({
          id: currentItemId,
          updateFn(item) {
            if (item.request) {
              item.request.url = value;
            }
          },
        })
      );
    }
    setUrl(value);
  };

  useEffect(() => {
    if (urlRef.current) {
      urlRef.current.value = item?.request?.url || "";
    }
  }, [item]);

  return {
    url,
    urlRef,
    onChange,
  };
};
