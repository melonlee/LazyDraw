"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, X } from "lucide-react";
import { generateMockMermaidFromIntent } from "@/lib/mermaid";
import { cn } from "@/lib/utils";
import ExcalidrawCanvas from "@/components/ExcalidrawCanvas";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [mounted, setMounted] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [mermaid, setMermaid] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elementsFlyOut, setElementsFlyOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setIsGenerating(true);
    setProgress(0);
    
    // 模拟进度条动画
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 96) {
          return Math.min(prev + 0.1, 98);
        } else if (prev >= 90) {
          return prev + 0.3;
        } else if (prev >= 75) {
          return prev + 0.6;
        } else if (prev >= 50) {
          return prev + 0.9;
        } else if (prev >= 25) {
          return prev + 1.1;
        } else {
          return prev + 1.3;
        }
      });
    }, 100);
    
    // 模拟生成过程
    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(99);
      
        setTimeout(() => {
          setProgress(100);
          
          setTimeout(() => {
            // 触发元素飞出效果
            setElementsFlyOut(true);
            
            // 等待飞出动画完成后跳转到chat页面
            setTimeout(() => {
              // 将用户输入传递给chat页面
              const params = new URLSearchParams();
              params.set('input', inputValue);
              window.location.href = `/chat?${params.toString()}`;
            }, 600); // 等待飞出动画完成
          }, 500);
        }, 1000);
    }, 3000); // 3秒的生成时间
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setMermaid("");
    setElementsFlyOut(false);
  };


  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 blur-3xl" />
      
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -150, rotate: -3 }}
          animate={mounted ? { opacity: 1, y: 0, rotate: 12 } : { opacity: 0, y: -150, rotate: -3 }}
          transition={{ duration: 2.4, delay: 0.3, ease: [0.23, 0.86, 0.39, 0.96] }}
          className="absolute left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        >
          <motion.div
            animate={mounted ? { y: [0, 15, 0] } : { y: 0 }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="w-[600px] h-[140px] relative"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-200/40 to-transparent backdrop-blur-[2px] border-2 border-blue-100/30 shadow-[0_8px_32px_0_rgba(59,130,246,0.1)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -150, rotate: 15 }}
          animate={mounted ? { opacity: 1, y: 0, rotate: -15 } : { opacity: 0, y: -150, rotate: 15 }}
          transition={{ duration: 2.4, delay: 0.5, ease: [0.23, 0.86, 0.39, 0.96] }}
          className="absolute right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        >
          <motion.div
            animate={mounted ? { y: [0, 15, 0] } : { y: 0 }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="w-[500px] h-[120px] relative"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-200/40 to-transparent backdrop-blur-[2px] border-2 border-purple-100/30 shadow-[0_8px_32px_0_rgba(147,51,234,0.1)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_70%)]" />
          </motion.div>
        </motion.div>
      </div>

      {/* 网站名称 */}
      <div className="absolute top-6 left-6 z-20">
        <h1 className="text-2xl sm:text-3xl font-bold">
          <span className={cn("bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600", "font-pacifico")}>
            LazyDraw
          </span>
        </h1>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: elementsFlyOut ? 0 : 1, 
              y: elementsFlyOut ? -100 : 0,
              scale: elementsFlyOut ? 0.8 : 1
            }}
            transition={{ 
              duration: elementsFlyOut ? 0.6 : 1, 
              delay: elementsFlyOut ? 0 : 0.5, 
              ease: elementsFlyOut ? "easeIn" : "easeOut" 
            }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-700">Hi, What would you like to</span>
              <br />
              <span className={cn("bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600", "font-pacifico")}>
                draw?
              </span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: elementsFlyOut ? 0 : 1, 
              y: elementsFlyOut ? -80 : 0,
              scale: elementsFlyOut ? 0.9 : 1
            }}
            transition={{ 
              duration: elementsFlyOut ? 0.6 : 1, 
              delay: elementsFlyOut ? 0.1 : 0.7, 
              ease: elementsFlyOut ? "easeIn" : "easeOut" 
            }}
          >
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              One Word. Perfect Diagram. Powered by LazyDraw.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: elementsFlyOut ? 0 : 1, 
              y: elementsFlyOut ? -60 : 0,
              scale: elementsFlyOut ? 0.9 : 1
            }}
            transition={{ 
              duration: elementsFlyOut ? 0.6 : 1, 
              delay: elementsFlyOut ? 0.2 : 0.9, 
              ease: elementsFlyOut ? "easeIn" : "easeOut" 
            }}
            className="relative max-w-2xl mx-auto"
          >
            {!isGenerating ? (
              <motion.form 
                onSubmit={handleSubmit}
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Describe what you want to draw..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full h-12 sm:h-14 text-base sm:text-lg pl-4 sm:pl-6 pr-14 sm:pr-16 rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:ring-0 bg-white/80 backdrop-blur-sm text-gray-900 placeholder:text-gray-500 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!inputValue.trim()}
                    className="absolute right-1 sm:right-2 top-1 sm:top-2 h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 shadow-lg transition-all duration-200 disabled:opacity-50"
                  >
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ 
                  opacity: elementsFlyOut ? 0 : 1, 
                  scale: elementsFlyOut ? 0.8 : 1, 
                  y: elementsFlyOut ? -40 : 0
                }}
                transition={{ 
                  duration: elementsFlyOut ? 0.6 : 0.4, 
                  delay: elementsFlyOut ? 0.3 : 0,
                  ease: elementsFlyOut ? "easeIn" : "easeOut" 
                }}
                className="w-full"
              >
                <div className="relative h-8 bg-gray-100 border border-gray-200 rounded overflow-hidden">
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(90deg, transparent 0%, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
                        linear-gradient(0deg, transparent 0%, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)
                      `,
                      backgroundSize: "8px 8px",
                    }}
                  />
                  
                  <div
                    className="absolute top-0 left-0 h-full transition-all duration-100 ease-out"
                    style={{
                      width: `${progress}%`,
                      backgroundImage: `
                        repeating-linear-gradient(
                          90deg,
                          #6b7280 0px,
                          #6b7280 6px,
                          #ffffff 6px,
                          #ffffff 8px
                        ),
                        repeating-linear-gradient(
                          0deg,
                          #6b7280 0px,
                          #6b7280 6px,
                          #ffffff 6px,
                          #ffffff 8px
                        )
                      `,
                      backgroundSize: "8px 8px",
                    }}
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-mono text-gray-700">{Math.round(progress)}%</span>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-sm font-medium text-gray-600 animate-pulse">
                    Generating...
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/80 pointer-events-none" />

      {/* 编辑器容器 - 从屏幕深处飞入效果 */}
      <motion.div
        className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md"
        initial={{ 
          opacity: 0, 
          scale: 0.3, 
          rotateX: 45,
          z: -500 
        }}
        animate={{ 
          opacity: showEditor ? 1 : 0,
          scale: showEditor ? 1 : 0.3,
          rotateX: showEditor ? 0 : 45,
          z: showEditor ? 0 : -500
        }}
        transition={{ 
          duration: 1.2, 
          ease: [0.25, 0.46, 0.45, 0.94],
          opacity: { duration: 0.6, delay: showEditor ? 0.4 : 0 },
          scale: { duration: 1.2, delay: showEditor ? 0.3 : 0 },
          rotateX: { duration: 1.2, delay: showEditor ? 0.3 : 0 },
          z: { duration: 1.2, delay: showEditor ? 0.3 : 0 }
        }}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        }}
      >
        <div className="h-full flex flex-col">
          {/* 顶部导航栏 */}
          <div className="bg-gray-50 backdrop-blur-sm border-b border-gray-200 px-4 py-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseEditor}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                  Close
                </Button>
                <div className="text-sm text-gray-500 truncate">
                  Intent: {inputValue || "Not specified"}
                </div>
              </div>
            </div>
          </div>
          
          {/* 编辑器区域 */}
          <div className="flex-1 p-6">
            <div className="h-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {mermaid && (
                <ExcalidrawCanvas mermaid={mermaid} className="w-full h-full" />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}