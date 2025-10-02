import { updateCollectionItemById } from "@/store/slices/app.slice";
import type { CollectionItemType, RequestType } from "@/types/types";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./use-store";

export const useCollection = () => {
  const collections = useAppSelector((state) => state.app.collections);
  const selectedItemId = useAppSelector((state) => state.app.currentItemId);
  const dispatch = useAppDispatch();
  const item = useMemo(() => {
    if (!selectedItemId || !collections) return null;

    const findItemById = (
      items: CollectionItemType[],
      id: string
    ): CollectionItemType | null => {
      for (const item of items) {
        if (item.id === id) {
          return item;
        }
        if (item.items && Array.isArray(item.items)) {
          const found = findItemById(item.items, id);
          if (found) {
            return found;
          }
        }
      }
      return null;
    };

    return findItemById(collections, selectedItemId);
  }, [collections, selectedItemId]);

  const updateRequestItemById = (request: Partial<RequestType>) => {
    if (!selectedItemId || !collections) {
      console.warn("No selectedItemId or collections available");
      return;
    }

    dispatch(
      updateCollectionItemById({
        id: selectedItemId,
        updateFn(item) {
          if (item.request) {
            item.request = {
              ...item.request,
              ...request,
            };
          }
        },
      })
    );
  };

  return {
    item,
    collections,
    selectedItemId,
    updateRequestItemById,
  };
};
