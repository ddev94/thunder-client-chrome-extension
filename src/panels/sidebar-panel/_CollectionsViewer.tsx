import { TreeView, type TreeDataItem } from "@/components/extra/tree-view";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { storage } from "@/lib/storage";
import { setCurrentItemId } from "@/store/slices/app.slice";
import type { CollectionItemType } from "@/types/types";
import { Folder, FolderOpen } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CollectionItem } from "./_CollectionItem";
import { MethodRenderer } from "./_MethodRenderer";

export function CollectionsViewer() {
  const [expandedItemIds, setExpandedItemIds] = useState<string[]>([]);
  const currentItemId = useAppSelector((state) => state.app.currentItemId);
  const collections = useAppSelector((state) => state.app.collections);
  const dispatch = useAppDispatch();
  const data = useMemo<TreeDataItem[]>(() => {
    function convertItem(item: CollectionItemType): TreeDataItem {
      const converted: TreeDataItem = {
        id: item.id,
        icon:
          item.type === "folder" || item.type === "collection" ? (
            <Folder size={18} />
          ) : (
            <MethodRenderer method={item.request?.method} />
          ),
        openIcon: <FolderOpen size={18} />,
        name: <CollectionItem item={item} />,
        data: { request: item.request },
      };

      if (
        (item.type === "folder" || item.type === "collection") &&
        item.items &&
        item.items.length > 0
      ) {
        converted.children = item.items.map(convertItem);
      }
      return converted;
    }
    return (collections || []).map(convertItem);
  }, [collections]);
  const onSelectChange = async (item?: TreeDataItem) => {
    if (!item) return;
    if (item.children && item.children.length > 0) {
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
    } else {
      dispatch(setCurrentItemId(item?.id || null));
    }
  };

  useEffect(() => {
    (async () => {
      const storedExpandedIds: string[] =
        (await storage.get("expandedItemIds")) || [];
      setExpandedItemIds(storedExpandedIds);
    })();
  }, []);
  return (
    <TreeView
      data={data}
      expandedItemIds={expandedItemIds}
      onSelectChange={onSelectChange}
      selectedItemId={currentItemId as string}
    />
  );
}
