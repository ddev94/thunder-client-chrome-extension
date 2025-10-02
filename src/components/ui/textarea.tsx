import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  const baseClass =
    "flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm";
  const ariaClass =
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";
  const themeClass =
    "border-input placeholder:text-muted-foreground dark:bg-input/30";

  return (
    <textarea
      data-slot="textarea"
      className={cn(baseClass, ariaClass, themeClass, className)}
      {...props}
    />
  );
}

export { Textarea };
