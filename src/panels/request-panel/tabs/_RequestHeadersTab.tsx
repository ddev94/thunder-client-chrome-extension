import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useRequest } from "@/request.provider";
import { Plus, Trash2 } from "lucide-react";
import { useMemo } from "react";

export function RequestHeadersTab() {
  const { request, setRequest } = useRequest();
  const headers = useMemo(() => {
    if (!request) return [];
    return request.headers;
  }, [request]);
  const addHeader = () => {
    if (!request) return;
    setRequest({
      ...request,
      headers: [...headers, { header: "", value: "", isDisabled: false }],
    });
  };

  const removeHeader = (index: number) => {
    const newHeaders = [...headers];
    if (!request) return;
    newHeaders.splice(index, 1);
    setRequest({
      ...request,
      headers: newHeaders,
    });
  };
  const disableHeader = (index: number) => {
    const newHeaders = [...headers];
    if (!request) return;
    newHeaders[index].isDisabled = !newHeaders[index].isDisabled;
    setRequest({
      ...request,
      headers: newHeaders,
    });
  };

  const onHeaderChange = (index: number, newHeader: string) => {
    const newHeaders = [...headers];
    if (!request) return;
    newHeaders[index].header = newHeader;
    setRequest({
      ...request,
      headers: newHeaders,
    });
  };
  const onValueChange = (index: number, newValue: string) => {
    const newHeaders = [...headers];
    if (!request) return;
    newHeaders[index].value = newValue;
    setRequest({
      ...request,
      headers: newHeaders,
    });
  };
  return (
    <div>
      <h4 className="text-lg">Headers</h4>
      <div>
        <Button size="sm" variant="ghost" className="mt-2" onClick={addHeader}>
          <Plus /> Add
        </Button>
      </div>
      {headers.map((header, index) => (
        <div key={index} className="flex items-center space-x-2 mt-3">
          <Input
            placeholder="header"
            defaultValue={header.header}
            disabled={header.isDisabled}
            readOnly={header.readonly}
            onChange={(e) => onHeaderChange(index, e.target.value)}
          />
          <Input
            placeholder="value"
            defaultValue={header.value}
            disabled={header.isDisabled}
            readOnly={header.readonly}
            onChange={(e) => onValueChange(index, e.target.value)}
          />
          <div className="flex items-center space-x-1">
            <Checkbox
              disabled={header.readonly}
              defaultChecked={!header.isDisabled}
              onCheckedChange={() => disableHeader(index)}
            />
            <Button
              disabled={header.readonly}
              size="icon"
              variant="ghost"
              onClick={() => removeHeader(index)}
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
