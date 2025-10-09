import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { RequestMethod } from "@/types/types";

export function MethodRenderer({ method }: { method?: RequestMethod }) {
  if (!method) return null;
  const classes = cn(
    "mr-2 border font-medium text-xs px-1.5 py-0.5 rounded w-[60px]",
    method === "GET" && "bg-green-500/10 text-green-500 border-green-500",
    method === "POST" && "bg-blue-500/10 text-blue-500 border-blue-500",
    method === "PATCH" && "bg-yellow-500/10 text-yellow-500 border-yellow-500",
    method === "PUT" && "bg-orange-500/10 text-orange-500 border-orange-500",
    method === "DELETE" && "bg-red-500/10 text-red-500 border-red-500"
  );
  return <Badge className={classes}>{method}</Badge>;
}
