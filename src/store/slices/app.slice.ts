import { storage } from "@/lib/storage";
import type { CollectionItemType, TreeDataItem } from "@/types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AppState = {
  currentItemId: string | null;
  currentItem: CollectionItemType | null;
  collections: CollectionItemType[];
  renameDialogOpen?: boolean;
  currentEditingItem: CollectionItemType | null;
  expandedItemIds?: string[];
};

const initialState: AppState = {
  currentItemId: storage.get("thunder:currentItemId") || null,
  currentItem: null,
  collections: [],
  renameDialogOpen: false,
  currentEditingItem: null,
  expandedItemIds: storage.get("thunder:expandedItemIds") || [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentItemId(state, action: PayloadAction<string | null>) {
      state.currentItemId = action.payload;
      storage.set("thunder:currentItemId", state.currentItemId);
    },
    updateExpanededItemIds(state, action: PayloadAction<string>) {
      if (state.expandedItemIds?.includes(action.payload)) {
        state.expandedItemIds = state.expandedItemIds.filter(
          (id) => id !== action.payload
        );
      } else {
        state.expandedItemIds = [
          ...(state.expandedItemIds || []),
          action.payload,
        ];
      }
      storage.set("thunder:expandedItemIds", state.expandedItemIds);
    },
    setCollections(state, action: PayloadAction<CollectionItemType[]>) {
      state.collections = action.payload;
      storage.set("thunder:collections", state.collections);
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
      storage.set("thunder:collections", state.collections);
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
      if (newItem.type !== "folder") {
        state.currentItemId = newItem.id;
      }
      storage.set("thunder:collections", state.collections);
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
      storage.set("thunder:collections", state.collections);
    },

    addRootItem(state, action: PayloadAction<CollectionItemType>) {
      state.collections.unshift(action.payload);
      storage.set("thunder:collections", state.collections);
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
  updateExpanededItemIds,
  updateCollectionItemById,
  addNewItem,
  deleteItem,
  addRootItem,
  updateOrder,
  toggleRenameDialog,
  setCurrentEditingItem,
} = appSlice.actions;
