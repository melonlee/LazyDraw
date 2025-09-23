"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

// 动态导入 Excalidraw，避免 SSR 问题
const Excalidraw = dynamic(async () => {
  const mod = await import("@excalidraw/excalidraw");
  return mod.Excalidraw;
}, { 
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-white">Loading...</div>
});

type ExcalidrawElement = any;

export interface ExcalidrawCanvasProps {
  mermaid: string;
  className?: string;
}

export default function ExcalidrawCanvas({ mermaid, className }: ExcalidrawCanvasProps) {
  const [initialData, setInitialData] = useState<{ elements: ExcalidrawElement[] }>({ elements: [] });

  const elements = useMemo(() => parseSimpleMermaidFlowchart(mermaid), [mermaid]);

  useEffect(() => {
    setInitialData({ elements });
  }, [elements]);

  return (
    <div className={className ?? "w-full h-[70vh] border rounded-xl overflow-hidden bg-white"}>
      <Excalidraw 
        initialData={initialData}
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

// ---- 简易 mermaid flowchart 解析器，仅支持节点与 "-->" 连线 ----
function parseSimpleMermaidFlowchart(source: string): ExcalidrawElement[] {
  const lines = source.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (!lines.length) return [];

  const isFlow = /^flowchart\s+(TD|TB|LR|RL)/i.test(lines[0]);
  const body = isFlow ? lines.slice(1) : lines;

  type Node = { id: string; label: string };
  const nodes = new Map<string, Node>();
  const edges: Array<{ from: string; to: string }> = [];

  for (const line of body) {
    // A[Text] --> B[Text]
    const match = line.match(/([A-Za-z0-9_]+)\s*\[(.+?)\]\s*--?>\s*([A-Za-z0-9_]+)\s*\[(.+?)\]/);
    if (match) {
      const [, aId, aLabel, bId, bLabel] = match;
      if (!nodes.has(aId)) nodes.set(aId, { id: aId, label: aLabel });
      if (!nodes.has(bId)) nodes.set(bId, { id: bId, label: bLabel });
      edges.push({ from: aId, to: bId });
      continue;
    }

    // 单独节点： A[Text]
    const nodeMatch = line.match(/([A-Za-z0-9_]+)\s*\[(.+?)\]/);
    if (nodeMatch) {
      const [, id, label] = nodeMatch;
      if (!nodes.has(id)) nodes.set(id, { id, label });
    }
  }

  // 简单网格布局
  const nodeEntries = Array.from(nodes.values());
  const gapX = 260;
  const gapY = 160;
  const maxCols = 3;
  const elements: ExcalidrawElement[] = [];

  const nodeIdToPosition = new Map<string, { x: number; y: number }>();
  nodeEntries.forEach((n, idx) => {
    const col = idx % maxCols;
    const row = Math.floor(idx / maxCols);
    const x = 80 + col * gapX;
    const y = 80 + row * gapY;
    nodeIdToPosition.set(n.id, { x, y });
    elements.push(...createRectangle(n.label, x, y, idx));
  });

  edges.forEach((edge, idx) => {
    const from = nodeIdToPosition.get(edge.from);
    const to = nodeIdToPosition.get(edge.to);
    if (!from || !to) return;
    elements.push(createArrow(from.x + 180, from.y + 40, to.x, to.y + 40, idx));
  });

  return elements;
}

function createRectangle(text: string, x: number, y: number, index: number): ExcalidrawElement {
  const id = `rect-${index}`;
  const textId = `text-${index}`;
  return [
    {
      type: "rectangle",
      id,
      x,
      y,
      width: 200,
      height: 80,
      angle: 0,
      strokeColor: "#1e293b",
      backgroundColor: "#eef2ff",
      fillStyle: "hachure",
      strokeWidth: 1,
      roughness: 1,
      seed: 12345 + index, // 使用固定种子避免水合错误
    },
    {
      type: "text",
      id: textId,
      x: x + 100,
      y: y + 40,
      text,
      fontSize: 18,
      textAlign: "center",
      verticalAlign: "middle",
      backgroundColor: "transparent",
      strokeColor: "#1f2937",
      width: 0,
      height: 0,
      angle: 0,
      seed: 54321 + index, // 使用固定种子避免水合错误
    },
  ] as unknown as ExcalidrawElement;
}

function createArrow(x1: number, y1: number, x2: number, y2: number, index: number): ExcalidrawElement {
  return {
    type: "arrow",
    id: `arrow-${index}`,
    x: x1,
    y: y1,
    width: x2 - x1,
    height: y2 - y1,
    points: [
      [0, 0],
      [x2 - x1, y2 - y1],
    ],
    strokeColor: "#1e293b",
    backgroundColor: "transparent",
    roughness: 1,
    strokeWidth: 1,
    seed: 67890 + index, // 使用固定种子避免水合错误
  } as unknown as ExcalidrawElement;
}


