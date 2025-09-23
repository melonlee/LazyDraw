"use client";

import dynamic from "next/dynamic";

// 动态导入 Excalidraw，避免 SSR 问题
const Excalidraw = dynamic(async () => {
  const mod = await import("@excalidraw/excalidraw");
  return mod.Excalidraw;
}, { 
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-white">Loading...</div>
});

export interface ExcalidrawCanvasProps {
  mermaid: string;
  className?: string;
}

export default function ExcalidrawCanvas({ className }: ExcalidrawCanvasProps) {
  return (
    <div className={className ?? "w-full h-[70vh] border rounded-xl overflow-hidden bg-white"}>
      <Excalidraw 
        aiEnabled={false}
        theme="light"
        viewModeEnabled={false}
        zenModeEnabled={false}
        gridModeEnabled={false}
        UIOptions={{
          dockedSidebarBreakpoint: 0,
        }}
      />
    </div>
  );
}