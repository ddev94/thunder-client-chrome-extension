import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRequest } from "@/request.provider";
import { useMemo } from "react";

export const ResponseHeadersTab = () => {
  const { response } = useRequest();
  const headers = useMemo(() => {
    const headers: [string, string][] = [];
    for (const header of response?.headers?.entries() ?? []) {
      headers.push(header);
    }
    return headers;
  }, [response]);
  return (
    <div className="h-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {headers.map(([name, value]) => (
            <TableRow
              key={name}
              className="odd:bg-muted/50 odd:hover:bg-muted/50 hover:bg-transparent"
            >
              <TableCell className="font-medium">{name}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
