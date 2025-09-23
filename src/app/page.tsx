"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      console.log("Exploring topic:", inputValue);
      // TODO: 实现主题探索逻辑
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto">
          {/* 居中内容区域 */}
          <motion.div 
            className="space-y-8 text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {/* 主标题区域 */}
            <div className="space-y-2 lg:space-y-4">
              <motion.h1 
                className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 1.2,
                  delay: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                Hi, What would you like to draw?
              </motion.h1>
            </div>

            {/* 输入框区域 */}
            <motion.form 
              onSubmit={handleSubmit}
              className="relative max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 1.0,
                delay: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Describe what you want to draw..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full h-12 sm:h-14 text-base sm:text-lg pl-4 sm:pl-6 pr-14 sm:pr-16 rounded-xl sm:rounded-2xl border-2 border-purple-100 focus:border-purple-400 focus:ring-0 bg-white/90 backdrop-blur-sm shadow-lg shadow-purple-100/30"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 sm:right-2 top-1 sm:top-2 h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 shadow-lg shadow-purple-200/50 transition-all duration-200"
                >
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}