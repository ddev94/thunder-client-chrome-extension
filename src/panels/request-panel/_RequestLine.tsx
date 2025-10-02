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
import { RequestStatus, useRequest } from "@/request.provider";
import { LoaderCircleIcon } from "lucide-react";

export const RequestLine = () => {
  const id = useId();

  const methods = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
    "HEAD",
    "OPTIONS",
    "TRACE",
    "CONNECT",
  ];

  const { setResponse, response } = useRequest();
  const { request, setRequest } = useRequest();

  const method = request?.method || "GET";
  const url = request?.url || "";
  const queryParams = request?.queryParams || [];
  const cookies = request?.cookies || [];
  const handleSendRequest = () => {
    setResponse({
      size: 0,
      time: 0,
      statusCode: 0,
      status: RequestStatus.Pending,
      body: "{}",
    });

    if (chrome.cookies) {
      for (const cookie of cookies) {
        if (!cookie.isDisabled && cookie.key) {
          chrome.cookies.set({
            url: url,
            name: cookie.key,
            value: cookie.value,
          });
        }
      }
    }

    const start = performance.now();
    const searchParams = new URLSearchParams();
    queryParams.forEach((qp) => {
      if (!qp.isDisabled && qp.param) {
        searchParams.append(qp.param, qp.value);
      }
    });
    const urlWithParams =
      url + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    const headers = new Headers();
    for (const header of request?.headers.filter(
      (header) => !header.isDisabled && !header.readonly
    ) ?? []) {
      if (!header.isDisabled && header.header) {
        headers.append(header.header, header.value);
      }
    }
    fetch(urlWithParams, {
      method,
      headers,
      body: ["GET", "HEAD"].includes(method) ? null : request?.body || null,
    })
      .then(async (res) => {
        console.log(res);
        const text = await res.text();
        const sizeInBytes = new TextEncoder().encode(text).length;
        const end = performance.now();
        const headers = res.headers;

        setResponse({
          size: sizeInBytes,
          time: Math.round(end - start),
          statusCode: res.status,
          status: RequestStatus.Fulfilled,
          body: text,
          headers,
        });
      })
      .catch(() => {
        setResponse({
          size: 0,
          time: 0,
          statusCode: 500,
          status: RequestStatus.Rejected,
          body: "{}",
        });
      })
      .finally(() => {
        if (chrome.cookies) {
          for (const cookie of cookies) {
            if (!cookie.isDisabled && cookie.key) {
              chrome.cookies.remove({ url: url, name: cookie.key });
            }
          }
        }
      });
  };

  const setUrl = (newUrl: string) => {
    if (!request) return;
    setRequest({
      ...request,
      url: newUrl,
    });
  };

  const onMethodChange = (newMethod: string) => {
    if (!request) return;
    setRequest({
      ...request,
      method: newMethod,
    });
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex rounded-md shadow-xs">
        <Select
          defaultValue={method}
          name="method"
          onValueChange={onMethodChange}
        >
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
          type="text"
          className="-ms-px rounded-none shadow-none"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          className="rounded-l-none w-20"
          onClick={handleSendRequest}
          disabled={response?.status === RequestStatus.Pending}
        >
          {response?.status === RequestStatus.Pending && (
            <LoaderCircleIcon className="animate-spin" />
          )}
          Send
        </Button>
      </div>
    </div>
  );
};
