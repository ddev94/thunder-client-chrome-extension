import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/hooks/use-store";
import { useMemo } from "react";

export const ResponseCookiesTab = () => {
  const response = useAppSelector((state) => state.response.result);
  const cookies = useMemo(() => {
    return response?.cookies || [];
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
          {cookies.map(({ key, value }) => (
            <TableRow
              key={key}
              className="odd:bg-muted/50 odd:hover:bg-muted/50 hover:bg-transparent"
            >
              <TableCell className="font-medium">{key}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
