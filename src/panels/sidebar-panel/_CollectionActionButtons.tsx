"use client";

import { useState } from "react";

import { ChevronDownIcon, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCollection } from "@/hooks/use-collection";

const options = [
  {
    label: "Folder",
    icon: <PlusCircle size={18} />,
    description: "Create a new folder to organize your requests",
  },
  {
    label: "HTTP Request",
    icon: <PlusCircle size={18} />,
    description: "Create a new HTTP request to test your APIs",
  },
];

export const CollectionActionButtons = () => {
  const [selectedIndex, setSelectedIndex] = useState("0");
  const { addRootFolder, addRootHttpRequest } = useCollection();

  const handleButtonClick = () => {
    if (selectedIndex === "0") {
      addRootFolder();
    } else if (selectedIndex === "1") {
      addRootHttpRequest();
    }
  };
  return (
    <div className="divide-primary-foreground/30 inline-flex w-fit divide-x rounded-md shadow-xs">
      <Button
        className="rounded-none rounded-l-md shadow-none focus-visible:z-10"
        onClick={handleButtonClick}
      >
        {options[Number(selectedIndex)].icon}
        {options[Number(selectedIndex)].label}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="rounded-none rounded-r-md focus-visible:z-10"
          >
            <ChevronDownIcon />
            <span className="sr-only">Select option</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          sideOffset={4}
          align="end"
          className="max-w-64 md:max-w-xs!"
        >
          <DropdownMenuRadioGroup
            value={selectedIndex}
            onValueChange={setSelectedIndex}
          >
            {options.map((option, index) => (
              <DropdownMenuRadioItem
                key={option.label}
                value={String(index)}
                className="items-start [&>span]:pt-1.5"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">{option.label}</span>
                  <span className="text-muted-foreground text-xs">
                    {option.description}
                  </span>
                </div>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
