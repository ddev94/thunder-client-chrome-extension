import { storage } from "@/lib/storage";
import type { CollectionItemType, TreeDataItem } from "@/types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AppState = {
  currentItemId: string | null;
  currentItem: CollectionItemType | null;
  collections: CollectionItemType[];
};

const initialState: AppState = {
  currentItemId: null,
  currentItem: null,
  collections: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentItemId(state, action: PayloadAction<string | null>) {
      state.currentItemId = action.payload;
    },
    setCollections(state, action: PayloadAction<CollectionItemType[]>) {
      state.collections = action.payload;
    },
    updateCollectionItemById(
      state,
      action: PayloadAction<{
        id: string;
        updateFn: (item: CollectionItemType) => void;
      }>
    ) {
      const { id, updateFn } = action.payload;
      const updateItem = (items: CollectionItemType[]): boolean => {
        for (const item of items) {
          if (item.id === id) {
            updateFn(item);
            return true;
          }
          if (item.items && Array.isArray(item.items)) {
            const found = updateItem(item.items);
            if (found) {
              return true;
            }
          }
        }
        return false;
      };
      updateItem(state.collections);
      storage.set("collections", state.collections);
    },
    addNewItem(
      state,
      action: PayloadAction<{ parentId: string; newItem: CollectionItemType }>
    ) {
      const { parentId, newItem } = action.payload;
      console.log("Adding new item", parentId, newItem);
      const updateItem = (items: CollectionItemType[]): boolean => {
        for (const item of items) {
          if (item.id === parentId) {
            if (!item.items) {
              item.items = [];
            }
            item.items.unshift(newItem);
            return true;
          }
          if (item.items && Array.isArray(item.items)) {
            const found = updateItem(item.items);
            if (found) {
              return true;
            }
          }
        }
        return false;
      };
      updateItem(state.collections);
      state.currentItemId = newItem.id;
      storage.set("collections", state.collections);
    },
    deleteItem(state, action: PayloadAction<string>) {
      const id = action.payload;
      const deleteItemById = (items: CollectionItemType[]): boolean => {
        for (let i = 0; i < items.length; i++) {
          if (items[i].id === id) {
            items.splice(i, 1);
            return true;
          }
          if (items[i].items && Array.isArray(items[i].items)) {
            const found = deleteItemById(
              items[i].items as CollectionItemType[]
            );
            if (found) {
              return true;
            }
          }
        }
        return false;
      };
      deleteItemById(state.collections);
      storage.set("collections", state.collections);
    },

    addRootItem(state, action: PayloadAction<CollectionItemType>) {
      state.collections.unshift(action.payload);
      storage.set("collections", state.collections);
    },

    updateOrder(state, action: PayloadAction<TreeDataItem[]>) {
      storage.set("collections", action.payload);
    },
  },
});

export const {
  setCollections,
  setCurrentItemId,
  updateCollectionItemById,
  addNewItem,
  deleteItem,
  addRootItem,
  updateOrder,
} = appSlice.actions;
