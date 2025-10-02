import { cn } from "@/lib/utils";
import { useMemo } from "react";

import { useAppSelector } from "@/hooks/use-store";
import { getReasonPhrase } from "http-status-codes";

type ResponseStatusBarProps = {
  className?: string;
};

export function ResponseStatusBar({ className }: ResponseStatusBarProps) {
  const response = useAppSelector((state) => state.response.result);

  const statusText = useMemo(() => {
    const reasonPhrase = getReasonPhrase(response?.statusCode || 200);

    if (!response?.statusCode) return "";
    if (response.statusCode >= 400) {
      return (
        <span className="text-red-500">
          {response?.statusCode} {reasonPhrase}
        </span>
      );
    }

    if (response.statusCode >= 300) {
      return (
        <span className="text-yellow-500">
          {response?.statusCode} {response?.status}
        </span>
      );
    }

    return (
      <span className="text-green-500">
        {response?.statusCode} {response?.status}
      </span>
    );
  }, [response]);

  const bytes = useMemo(() => {
    if (!response?.size) return "0 B";
    if (response.size < 1024) return `${response.size} B`;
    if (response.size < 1024 * 1024)
      return `${(response.size / 1024).toFixed(2)} KB`;
    return `${(response.size / (1024 * 1024)).toFixed(2)} MB`;
  }, [response]);

  const time = useMemo(() => {
    if (!response?.time) return "0 ms";
    if (response.time < 1000) return `${response.time} ms`;
    return `${(response.time / 1000).toFixed(2)} s`;
  }, [response]);
  return (
    <div className={cn("flex space-x-4", className)}>
      <div className="font-semibold">Status: {statusText}</div>
      <div className="font-semibold">
        Size: <span className="text-green-500">{bytes}</span>
      </div>
      <div className="font-semibold">
        Time: <span className="text-green-500">{time}</span>
      </div>
    </div>
  );
}
