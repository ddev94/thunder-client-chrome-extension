import type { CollectionItemType } from "@/types/types";
import { useEffect } from "react";

const collections: CollectionItemType[] = [
  {
    id: "1",
    name: "Collection 1",
    type: "collection",
    items: [
      {
        id: "2",
        name: "Item 1.1",
        type: "folder",
        items: [
          {
            id: "3",
            name: "Call AA function",
            type: "request",
            request: {
              url: "https://jsonplaceholder.typicode.com/todos/1",
              method: "GET",
              queryParams: [{ param: "", value: "", isDisabled: false }],
              headers: [
                {
                  header: "Accept",
                  value: "*/*",
                  isDisabled: false,
                  readonly: true,
                },
                {
                  header: "Host",
                  value: "<calculated at runtime>",
                  isDisabled: false,
                  readonly: true,
                },
              ],
              cookies: [{ key: "", value: "", isDisabled: false }],
              body: JSON.stringify(
                {
                  title: "foo",
                  body: "bar",
                  userId: 1,
                },
                null,
                2
              ),
            },
          },
        ],
      },
      {
        id: "4",
        name: "Call AA function",
        type: "request",
        request: {
          url: "https://jsonplaceholder.typicode.com/todos/1",
          method: "GET",
        },
      },
      {
        id: "5",
        name: "Call AA function",
        type: "request",
        request: {
          url: "https://jsonplaceholder.typicode.com/todos/1",
          method: "POST",
        },
      },

      {
        id: "6",
        name: "Call AA function",
        type: "request",
        request: {
          url: "https://jsonplaceholder.typicode.com/todos/1",
          method: "PATCH",
        },
      },
      {
        id: "7",
        name: "Call AA function",
        type: "request",
        request: {
          method: "PUT",
          url: "https://jsonplaceholder.typicode.com/todos/1",
        },
      },
      {
        id: "8",
        name: "Call AA function",
        type: "request",
        request: {
          method: "DELETE",
          url: "https://jsonplaceholder.typicode.com/todos/1",
        },
      },
    ],
  },
];

export const useCollectionData = () => {
  const storeCollection = () => {
    localStorage.setItem("collections", JSON.stringify(collections));
  };
  useEffect(() => {
    storeCollection();
  }, []);
};
