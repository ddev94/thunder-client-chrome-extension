export function findNestedItemById<T extends { id: string; children?: T[] }>(
  data: T[],
  id: string
): T | null {
  for (const item of data) {
    if (item.id === id) {
      return item;
    }
    if (item.children && Array.isArray(item.children)) {
      const found: T | null = findNestedItemById(item.children, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

export function removeNestedItemById<T extends { id: string; children?: T[] }>(
  data: T[],
  id: string
): T[] {
  let removedItem: T | null = null;

  const filterItems = (items: T[]): T[] => {
    return items.filter((item) => {
      if (item.id === id) {
        removedItem = item;
        return false;
      }
      if (item.children && Array.isArray(item.children)) {
        item.children = filterItems(item.children);
      }
      return true;
    });
  };

  const updatedData = filterItems(data);
  return updatedData;
}
