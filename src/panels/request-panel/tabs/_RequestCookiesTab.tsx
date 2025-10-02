import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useRequestCookie } from "@/hooks/use-request-cookie";
import { Plus, Trash2 } from "lucide-react";
export function RequestCookiesTab() {
  const {
    cookies,
    addCookie,
    removeCookie,
    disableCookie,
    onKeyChange,
    onValueChange,
    cookieView,
    setCookieView,
    setRawCookies,
    importRawCookies,
  } = useRequestCookie();

  console.log(cookies);
  return (
    <div>
      <h4 className="text-lg">Cookies</h4>
      <div className="flex justify-between items-center">
        <div>
          <Button
            size="sm"
            variant="ghost"
            className="mt-2"
            onClick={addCookie}
          >
            <Plus /> Add
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button size="sm" variant="ghost" className="mt-2">
                <Plus /> Import From Raw
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-foreground mb-2">
                  Paste your raw cookie string below:
                </p>
                <Textarea
                  placeholder="e.g. key1=value1; key2=value2"
                  onChange={(e) => setRawCookies(e.target.value)}
                />
                <Button
                  size="sm"
                  className="mt-2"
                  onClick={() => importRawCookies()}
                >
                  <Plus /> Import
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Tabs
          defaultValue="key-value"
          className="gap-4"
          onValueChange={(value) =>
            setCookieView(value as "key-value" | "view-raw")
          }
        >
          <TabsList className="bg-background">
            <TabsTrigger
              value={"key-value"}
              className="data-[state=active]:border-border data-[state=active]:shadow-none"
            >
              Key-Value
            </TabsTrigger>
            <TabsTrigger
              value={"view-raw"}
              className="data-[state=active]:border-border data-[state=active]:shadow-none"
            >
              View Raw
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {cookieView === "key-value" && (
        <div className="mt-3 flex flex-col space-y-3">
          {cookies.map((cookie, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                placeholder="cookie name"
                defaultValue={cookie.key}
                disabled={cookie.isDisabled}
                onChange={(e) => onKeyChange(index, e.target.value)}
              />
              <Input
                placeholder="value"
                defaultValue={cookie.value}
                disabled={cookie.isDisabled}
                onChange={(e) => onValueChange(index, e.target.value)}
              />
              <div className="flex items-center space-x-1">
                <Checkbox
                  defaultChecked={!cookie.isDisabled}
                  onCheckedChange={() => disableCookie(index)}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeCookie(index)}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cookieView === "view-raw" && (
        <div className="mt-3">
          <Textarea
            value={cookies
              .filter((cookie) => !cookie.isDisabled && cookie.key)
              .map((cookie) => `${cookie.key}=${cookie.value}`)
              .join("; ")}
            readOnly
          />
        </div>
      )}
    </div>
  );
}
