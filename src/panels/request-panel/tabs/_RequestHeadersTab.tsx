import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useRequestHeader } from "@/hooks/use-request-header";
import { Plus, Trash2 } from "lucide-react";

export function RequestHeadersTab() {
  const {
    headers,
    addHeader,
    removeHeader,
    disableHeader,
    onHeaderChange,
    onValueChange,
  } = useRequestHeader();
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
