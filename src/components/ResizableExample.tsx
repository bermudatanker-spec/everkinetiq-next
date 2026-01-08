"use client";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

export default function ResizableExample() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-[400px] w-full rounded-xl border border-white/10"
    >
      <ResizablePanel defaultSize={50} minSize={20}>
        <div className="h-full p-4">Links</div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={50} minSize={20}>
        <div className="h-full p-4">Rechts</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}