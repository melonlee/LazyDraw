"use client";

import { useSearchParams, useRouter } from "next/navigation";
import ExcalidrawCanvas from "@/components/ExcalidrawCanvas";
import { useMemo, Suspense } from "react";
import { generateMockMermaidFromIntent } from "@/lib/mermaid";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function EditorContent() {
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get("q") || "";
  const mermaid = useMemo(() => generateMockMermaidFromIntent(q), [q]);

  return (
    <div className="h-screen bg-[#030303] flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
      
      {/* 顶部导航栏 */}
      <div className="relative z-10 bg-white/[0.03] backdrop-blur-sm border-b border-white/[0.08] px-4 py-3 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/60 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            返回
          </Button>
          <div className="text-sm text-white/40 truncate">
            意图: {q || "未指定"}
          </div>
        </div>
      </div>
      
      {/* 编辑器容器 */}
      <div className="relative z-10 flex-1 p-4">
        <div className="h-full bg-white/[0.03] backdrop-blur-sm rounded-lg shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] border border-white/[0.08] overflow-hidden">
          <ExcalidrawCanvas mermaid={mermaid} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-[#030303] flex items-center justify-center text-white">Loading...</div>}>
      <EditorContent />
    </Suspense>
  );
}


