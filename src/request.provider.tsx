import React from "react";

export enum RequestStatus {
  NotStarted = "not_started",
  Pending = "pending",
  Fulfilled = "OK",
  Rejected = "rejected",
}

type RequestType = {
  method: string;
  queryParams: { param: string; value: string; isDisabled: boolean }[];
  url: string;
  body: string;
  headers: {
    header: string;
    value: string;
    isDisabled?: boolean;
    readonly?: boolean;
  }[];
  cookies: { key: string; value: string; isDisabled: boolean }[];
};

type ResponseType = {
  size: number;
  time: number;
  statusCode: number;
  status: RequestStatus;
  body: string;
  headers?: Headers;
};

type RequestContextType = {
  request: RequestType | null;
  response: ResponseType | null;
  setResponse: (response: ResponseType | null) => void;
  setRequest: (request: RequestType | null) => void;
};

const requestContext = React.createContext<RequestContextType>(
  {} as RequestContextType
);

export const RequestProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [response, setResponse] = React.useState<ResponseType | null>(null);
  const [request, setRequest] = React.useState<RequestType | null>({
    method: "GET",
    queryParams: [{ param: "", value: "", isDisabled: false }],
    url: "https://jsonplaceholder.typicode.com/todos/1",
    body: "{}",
    headers: [
      { header: "Accept", value: "*/*", isDisabled: false, readonly: true },
      {
        header: "Host",
        value: "<calculated at runtime>",
        isDisabled: false,
        readonly: true,
      },
    ],
    cookies: [{ key: "", value: "", isDisabled: false }],
  });

  return (
    <requestContext.Provider
      value={{
        request,
        setRequest,
        response,
        setResponse,
      }}
    >
      {children}
    </requestContext.Provider>
  );
};

export const useRequest = () => React.useContext(requestContext);
