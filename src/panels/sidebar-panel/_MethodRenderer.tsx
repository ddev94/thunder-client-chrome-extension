import { Badge } from "@/components/ui/badge";
import type { RequestMethod } from "@/types/types";

export function MethodRenderer({ method }: { method?: RequestMethod }) {
  if (!method) return null;
  if (method === "GET") {
    return (
      <Badge className="mr-2 bg-green-500/10 text-green-500 border-green-500">
        {method}
      </Badge>
    );
  }
  if (method === "POST") {
    return (
      <Badge className="mr-2 bg-blue-500/10 text-blue-500 border-blue-500">
        {method}
      </Badge>
    );
  }
  if (method === "PATCH") {
    return (
      <Badge className="mr-2 bg-yellow-500/10 text-yellow-500 border-yellow-500">
        {method}
      </Badge>
    );
  }
  if (method === "PUT") {
    return (
      <Badge className="mr-2 bg-orange-500/10 text-orange-500 border-orange-500">
        {method}
      </Badge>
    );
  }
  if (method === "DELETE") {
    return (
      <Badge className="mr-2 bg-red-500/10 text-red-500 border-red-500">
        {method}
      </Badge>
    );
  }
  return <Badge className="mr-2">{method}</Badge>;
}
