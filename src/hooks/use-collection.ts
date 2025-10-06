import { storage } from "@/lib/storage";
import {
  addNewItem,
  addRootItem,
  deleteItem,
  setCurrentItemId,
  updateCollectionItemById,
  updateOrder,
} from "@/store/slices/app.slice";
import type {
  CollectionItemType,
  RequestType,
  TreeDataItem,
} from "@/types/types";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "./use-store";

export const useCollection = () => {
  const collections = useAppSelector((state) => state.app.collections);
  const selectedItemId = useAppSelector((state) => state.app.currentItemId);
  const currentItemId = useAppSelector((state) => state.app.currentItemId);
  const [expandedItemIds, setExpandedItemIds] = useState<string[]>([]);

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

  const addItem = (item: CollectionItemType) => {
    dispatch(
      addNewItem({
        parentId: item.id,
        newItem: {
          id: crypto.randomUUID(),
          name: "New Request",
          type: "request",
          request: {
            url: "",
            method: "GET",
            headers: [],
            body: "{}",
          },
        },
      })
    );
  };

  const addFolder = (item: CollectionItemType) => {
    dispatch(
      addNewItem({
        parentId: item.id,
        newItem: {
          id: crypto.randomUUID(),
          name: "New Folder",
          type: "folder",
          items: [],
        },
      })
    );
  };

  const _deleteItem = (id: string) => {
    dispatch(deleteItem(id));
    // Implementation for deleting an item
  };

  const updateExpandedItemIds = async (item: CollectionItemType) => {
    const expandedItemIds = await storage.get("expandedItemIds");
    if (expandedItemIds && Array.isArray(expandedItemIds)) {
      if (expandedItemIds.includes(item.id)) {
        await storage.set(
          "expandedItemIds",
          expandedItemIds.filter((id) => id !== item.id)
        );
        setExpandedItemIds((prev) => prev.filter((id) => id !== item.id));
      } else {
        await storage.set("expandedItemIds", [...expandedItemIds, item.id]);
        setExpandedItemIds((prev) => [...prev, item.id]);
      }
    } else {
      await storage.set("expandedItemIds", [item.id]);
      setExpandedItemIds([item.id]);
    }
  };

  useEffect(() => {
    (async () => {
      const storedExpandedIds: string[] =
        (await storage.get("expandedItemIds")) || [];
      setExpandedItemIds(storedExpandedIds);
    })();
  }, []);

  const updateCurrentItemId = (id: string | null) => {
    dispatch(setCurrentItemId(id));
  };

  const updateName = (name: string) => {
    if (!selectedItemId || !collections) {
      console.warn("No selectedItemId or collections available");
      return;
    }

    dispatch(
      updateCollectionItemById({
        id: selectedItemId,
        updateFn(item) {
          item.name = name;
        },
      })
    );
  };

  const renameItem = (id: string, newName: string) => {
    dispatch(
      updateCollectionItemById({
        id,
        updateFn(item) {
          item.name = newName;
        },
      })
    );
  };

  const addRootFolder = () => {
    dispatch(
      addRootItem({
        id: crypto.randomUUID(),
        name: "New Folder",
        type: "folder",
        items: [],
      })
    );
  };

  const addRootHttpRequest = () => {
    dispatch(
      addRootItem({
        id: crypto.randomUUID(),
        name: "New Request",
        type: "request",
        request: {
          url: "",
          method: "GET",
          headers: [],
          body: "{}",
        },
      })
    );
  };

  const onOrderChange = (items: TreeDataItem[]) => {
    dispatch(updateOrder(items));
  };

  return {
    currentItemId,
    item,
    collections,
    selectedItemId,
    expandedItemIds,
    updateRequestItemById,
    addItem,
    addFolder,
    updateExpandedItemIds,
    updateCurrentItemId,
    deleteItem: _deleteItem,
    updateName,
    renameItem,
    addRootFolder: addRootFolder,
    addRootHttpRequest,
    onOrderChange,
  };
};
