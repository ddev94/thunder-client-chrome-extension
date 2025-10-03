import { useId } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCollection } from "@/hooks/use-collection";
import { useRequestMethod } from "@/hooks/use-request-method";
import { useRequestUrl } from "@/hooks/use-request-url";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { setResponseResult } from "@/store/slices/response.slice";
import { LoaderCircleIcon } from "lucide-react";
type RequestLineProps = {
  className?: string;
};
export const RequestLine = ({ className }: RequestLineProps) => {
  const id = useId();

  const { method, onMethodChange, methods } = useRequestMethod();
  const { url, urlRef, onChange } = useRequestUrl();
  const dispatch = useAppDispatch();

  const response = useAppSelector((state) => state.response.result);
  const { item } = useCollection();

  const sendRequest = () => {
    if (!item?.request) {
      console.warn("No request data available");
      return;
    }
    const { url, method, headers, body } = item.request;
    dispatch(
      setResponseResult({
        statusCode: null,
        statusText: "",
        time: null,
        size: null,
        body: "",
        headers: [],
        cookies: [],
        error: null,
        status: "loading",
      })
    );
    const start = performance.now();
    const urlWithParams = new URL(url);
    // Append query parameters if any
    if (item.request.queryParams) {
      item.request.queryParams
        .filter((param) => !param.isDisabled && param.param)
        .forEach((param) => {
          urlWithParams.searchParams.append(param.param, param.value);
        });
    }
    fetch(urlWithParams, {
      method: method || "GET",
      headers: headers?.reduce((acc, header) => {
        acc[header.header] = header.value;
        return acc;
      }, {} as Record<string, string>),
      body: ["GET", "HEAD"].includes(method) ? null : body || null,
    })
      .then(async (response) => {
        const end = performance.now();
        const responseBody = await response.text();
        const sizeInBytes = new TextEncoder().encode(responseBody).length;
        dispatch(
          setResponseResult({
            statusCode: response.status,
            statusText: response.statusText,
            time: Math.round(end - start),
            size: sizeInBytes,
            body: responseBody,
            headers: Array.from(response.headers.entries()).map(
              ([key, value]) => ({ key, value })
            ),
            cookies: [],
            error: null,
            status: "succeeded",
          })
        );
      })
      .catch((e) => {
        console.error("Request failed", e);
        dispatch(
          setResponseResult({
            statusCode: 500,
            statusText: "Internal Server Error",
            time: 0,
            size: 0,
            body: "",
            headers: [],
            cookies: [],
            error: e.message,
            status: "failed",
          })
        );
      })
      .finally(() => {
        // Any cleanup actions can be performed here
        return null;
      });
  };

  return (
    <div className={cn("w-full space-y-2 px-4", className)}>
      <div className="flex rounded-md shadow-xs">
        <Select value={method} name="method" onValueChange={onMethodChange}>
          <SelectTrigger
            id={id}
            className="rounded-r-none shadow-none focus-visible:z-1 w-[120px]"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {methods.map((method) => (
              <SelectItem
                key={method}
                value={method}
                className="pr-2 [&_svg]:hidden"
              >
                {method}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          id={id}
          ref={urlRef}
          type="text"
          className="-ms-px rounded-none shadow-none"
          defaultValue={url}
          onChange={(e) => onChange(e.target.value)}
        />
        <Button
          className="rounded-l-none w-20"
          onClick={() => sendRequest()}
          disabled={response?.status === "loading"}
        >
          {response?.status === "loading" && (
            <LoaderCircleIcon className="animate-spin" />
          )}
          Send
        </Button>
      </div>
    </div>
  );
};
