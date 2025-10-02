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

  {
    name: "Test",
    value: "test",
    content: (
      <>
        <span className="text-foreground font-semibold">Test!</span> Here&apos;s
        something unexpected—a fun fact, a quirky tip, or a daily challenge.
        Come back for a new surprise every day!
      </>
    ),
  },
  {
    name: "Pre Run",
    value: "pre-run",
    content: (
      <>
        <span className="text-foreground font-semibold">Pre Run!</span>{" "}
        Here&apos;s something unexpected—a fun fact, a quirky tip, or a daily
        challenge. Come back for a new surprise every day!
      </>
    ),
  },
];

type RequestTabsProps = {
  className?: string;
};

export const RequestTabs = ({ className }: RequestTabsProps) => {
  return (
    <div className={cn("w-full", className)}>
      <Tabs defaultValue="query" className="gap-4">
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
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
