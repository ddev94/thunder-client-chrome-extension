export enum RequestStatus {
  NotStarted = "not_started",
  Pending = "pending",
  Fulfilled = "OK",
  Rejected = "rejected",
}

export type RequestMethod =
  | "GET"
  | "POST"
  | "PATCH"
  | "PUT"
  | "DELETE"
  | "HEAD"
  | "OPTIONS"
  | "TRACE"
  | "CONNECT";

export type RequestType = {
  itemId?: string;
  method: RequestMethod;
  queryParams?: { param: string; value: string; isDisabled: boolean }[];
  url: string;
  body?: string;
  headers?: {
    header: string;
    value: string;
    isDisabled?: boolean;
    readonly?: boolean;
  }[];
  cookies?: { key: string; value: string; isDisabled: boolean }[];
};

export type CollectionItemType = {
  id: string;
  name: string;
  type: "collection" | "folder" | "request";
  items?: CollectionItemType[];
  request?: RequestType;
  data?: any;
};
