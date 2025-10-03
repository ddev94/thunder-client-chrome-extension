import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useRequestQuery } from "@/hooks/use-request-query";
import { Plus, Trash2 } from "lucide-react";

export function RequestQueryTab() {
  const {
    queryParams,
    addQueryParam,
    removeQueryParam,
    disableQueryParam,
    onParamChange,
    onValueChange,
  } = useRequestQuery();

  return (
    <div className="flex-1 overflow-y-auto px-4">
      <h4 className="text-lg">Query Parameters</h4>
      <div>
        <Button
          size="sm"
          variant="ghost"
          className="mt-2"
          onClick={addQueryParam}
        >
          <Plus /> Add
        </Button>
      </div>
      {queryParams?.map((qp, index) => (
        <div key={index} className="flex items-center space-x-2 mt-3">
          <Input
            placeholder="param"
            defaultValue={qp.param}
            disabled={qp.isDisabled}
            onChange={(e) => onParamChange(index, e.target.value)}
          />
          <Input
            placeholder="value"
            defaultValue={qp.value}
            disabled={qp.isDisabled}
            onChange={(e) => onValueChange(index, e.target.value)}
          />
          <div className="flex items-center space-x-1">
            <Checkbox
              defaultChecked={!qp.isDisabled}
              onCheckedChange={() => disableQueryParam(index)}
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => removeQueryParam(index)}
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
