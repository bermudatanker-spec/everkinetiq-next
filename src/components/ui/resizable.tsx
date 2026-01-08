"use client";

import * as React from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import { cn } from "@/lib/utils";

type GroupProps = React.ComponentProps<typeof Group> & { className?: string };
type PanelProps = React.ComponentProps<typeof Panel> & { className?: string };
type SeparatorProps = React.ComponentProps<typeof Separator> & {
  className?: string;
  withHandle?: boolean;
};

function ResizablePanelGroup({ className, ...props }: GroupProps) {
  return (
    <Group
      className={cn(
        "flex h-full w-full data-[panel-group-orientation=vertical]:flex-col",
        className
      )}
      {...props}
    />
  );
}

function ResizablePanel({ className, ...props }: PanelProps) {
  return <Panel className={cn("h-full w-full", className)} {...props} />;
}

function ResizableHandle({
  className,
  withHandle = false,
  ...props
}: SeparatorProps) {
  return (
    <Separator
      className={cn(
        "relative flex w-px items-center justify-center bg-white/10",
        "data-[panel-group-orientation=vertical]:h-px data-[panel-group-orientation=vertical]:w-full",
        className
      )}
      {...props}
    >
      {withHandle ? (
        <div className="z-10 flex h-5 w-5 items-center justify-center rounded-md border border-white/15 bg-white/5">
          <div className="h-3 w-3 rounded-sm bg-white/30" />
        </div>
      ) : null}
    </Separator>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };