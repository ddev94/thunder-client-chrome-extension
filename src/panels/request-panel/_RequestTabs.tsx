import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { RequestBodyTab } from "./tabs/_RequestBodyTab";
import { RequestCookiesTab } from "./tabs/_RequestCookiesTab";
import { RequestHeadersTab } from "./tabs/_RequestHeadersTab";
import { RequestQueryTab } from "./tabs/_RequestQueryTab";

const tabs = [
  {
    name: "Query",
    value: "query",
    content: <RequestQueryTab />,
  },
  {
    name: "Body",
    value: "body",
    content: <RequestBodyTab />,
  },
  {
    name: "Headers",
    value: "headers",
    content: <RequestHeadersTab />,
  },
  {
    name: "Cookies",
    value: "cookies",
    content: <RequestCookiesTab />,
  },
];

type RequestTabsProps = {
  className?: string;
};

export const RequestTabs = ({ className }: RequestTabsProps) => {
  return (
    <div className={cn("w-full", className)}>
      <Tabs defaultValue="query" className="gap-4 h-full overflow-hidden">
        <TabsList className="bg-background rounded-none border-b w-full p-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "bg-background",
                "font-normal",
                "data-[state=active]:font-semibold",
                "dark:data-[state=active]:font-semibold",
                "data-[state=active]:border-primary",
                "dark:data-[state=active]:border-primary",
                "h-full",
                "rounded-none",
                "border-0",
                "border-b-2",
                "border-transparent",
                "data-[state=active]:shadow-none"
              )}
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="overflow-y-auto"
          >
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
