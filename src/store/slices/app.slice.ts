import { storage } from "@/lib/storage";
import type { CollectionItemType, TreeDataItem } from "@/types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AppState = {
  currentItemId: string | null;
  currentItem: CollectionItemType | null;
  collections: CollectionItemType[];
  renameDialogOpen?: boolean;
  currentEditingItem: CollectionItemType | null;
};

const initialState: AppState = {
  currentItemId: null,
  currentItem: null,
  collections: [],
  renameDialogOpen: false,
  currentEditingItem: null,
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
      storage.set("collections", state.collections);
    },
    updateCollectionItemById(
      state,
      action: PayloadAction<{
        id: string;
        updateFn: (item: CollectionItemType) => void;
      }>
    ) {
      const { id, updateFn } = action.payload;
      const updateItem = (children: CollectionItemType[]): boolean => {
        for (const item of children) {
          if (item.id === id) {
            updateFn(item);
            return true;
          }
          if (item.children && Array.isArray(item.children)) {
            const found = updateItem(item.children);
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
      const updateItem = (children: CollectionItemType[]): boolean => {
        for (const item of children) {
          if (item.id === parentId) {
            if (!item.children) {
              item.children = [];
            }
            item.children.unshift(newItem);
            return true;
          }
          if (item.children && Array.isArray(item.children)) {
            const found = updateItem(item.children);
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
      const deleteItemById = (children: CollectionItemType[]): boolean => {
        for (let i = 0; i < children.length; i++) {
          if (children[i].id === id) {
            children.splice(i, 1);
            return true;
          }
          if (children[i].children && Array.isArray(children[i].children)) {
            const found = deleteItemById(
              children[i].children as CollectionItemType[]
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

    updateOrder(_, action: PayloadAction<TreeDataItem[]>) {
      storage.set("collections", action.payload);
    },
    toggleRenameDialog(state, action: PayloadAction<boolean>) {
      state.renameDialogOpen = action.payload;
    },
    setCurrentEditingItem(
      state,
      action: PayloadAction<CollectionItemType | null>
    ) {
      state.currentEditingItem = action.payload;
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
  toggleRenameDialog,
  setCurrentEditingItem,
} = appSlice.actions;
