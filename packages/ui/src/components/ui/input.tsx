/* eslint-disable no-redeclare */
import * as React from "react";

import { cn } from "@repo/ui/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "ui-flex ui-h-9 ui-w-full ui-rounded-md ui-border ui-border-slate-200 ui-bg-transparent ui-px-3 ui-py-1 ui-text-base ui-shadow-sm ui-transition-colors file:ui-border-0 file:ui-bg-transparent file:ui-text-sm file:ui-font-medium file:ui-text-slate-950 placeholder:ui-text-slate-500 focus-visible:ui-outline-none focus-visible:ui-ring-1 focus-visible:ui-ring-slate-950 disabled:ui-cursor-not-allowed disabled:ui-opacity-50 md:ui-text-sm dark:ui-border-slate-800 dark:file:ui-text-slate-50 dark:placeholder:ui-text-slate-400 dark:focus-visible:ui-ring-slate-300",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
