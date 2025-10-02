import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useRequest } from "@/request.provider";
import { Plus, Trash2 } from "lucide-react";
import { useMemo } from "react";

export function RequestQueryTab() {
  const { request, setRequest } = useRequest();
  const queryParams = useMemo(() => {
    if (!request) return [];
    return request.queryParams;
  }, [request]);
  const addQueryParam = () => {
    if (!request) return;
    setRequest({
      ...request,
      queryParams: [
        ...queryParams,
        { param: "", value: "", isDisabled: false },
      ],
    });
  };

  const removeQueryParam = (index: number) => {
    const newParams = [...queryParams];
    if (!request) return;
    newParams.splice(index, 1);
    setRequest({
      ...request,
      queryParams: newParams,
    });
  };
  const disableQueryParam = (index: number) => {
    const newParams = [...queryParams];
    if (!request) return;
    newParams[index].isDisabled = !newParams[index].isDisabled;
    setRequest({
      ...request,
      queryParams: newParams,
    });
  };

  const onParamChange = (index: number, newParam: string) => {
    const newParams = [...queryParams];
    if (!request) return;
    newParams[index].param = newParam;
    setRequest({
      ...request,
      queryParams: newParams,
    });
  };
  const onValueChange = (index: number, newValue: string) => {
    const newParams = [...queryParams];
    if (!request) return;
    newParams[index].value = newValue;
    setRequest({
      ...request,
      queryParams: newParams,
    });
  };
  return (
    <div>
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
      {queryParams.map((qp, index) => (
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
