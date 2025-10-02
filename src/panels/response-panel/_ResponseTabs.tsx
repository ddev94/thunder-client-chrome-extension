import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ResponseHeadersTab } from "./tabs/_ResponseHeadersTab";
import { ResponseTab } from "./tabs/_ResponseTab";

const tabs = [
  {
    name: "Response",
    value: "response",
    content: <ResponseTab />,
  },
  {
    name: "Headers",
    value: "headers",
    content: <ResponseHeadersTab />,
  },
  {
    name: "Cookies",
    value: "cookies",
    content: (
      <>
        <span className="text-foreground font-semibold">Surprise!</span>{" "}
        Here&apos;s something unexpected—a fun fact, a quirky tip, or a daily
        challenge. Come back for a new surprise every day!
      </>
    ),
  },
  {
    name: "Results",
    value: "results",
    content: (
      <>
        <span className="text-foreground font-semibold">Body!</span> Here&apos;s
        something unexpected—a fun fact, a quirky tip, or a daily challenge.
        Come back for a new surprise every day!
      </>
    ),
  },
];

type ResponseTabsProps = {
  className?: string;
};

export const ResponseTabs = ({ className }: ResponseTabsProps) => {
  return (
    <div className={cn("w-full", className)}>
      <Tabs defaultValue="response" className="gap-4 h-full">
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
            className="overflow-hidden"
          >
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
