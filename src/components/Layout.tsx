"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 relative overflow-hidden">
      {/* 波浪背景特效 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 第一层波浪 */}
        <motion.div 
          className="absolute -top-40 -left-40 w-80 h-80 bg-purple-200/50 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.7, 0.4],
            x: [0, 40, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/4 -right-32 w-96 h-96 bg-indigo-200/45 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.35, 0.6, 0.35],
            x: [0, -30, 0],
            y: [0, 25, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute -bottom-32 left-1/4 w-72 h-72 bg-pink-200/50 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.65, 0.4],
            x: [0, 35, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* 第二层波浪 */}
        <motion.div 
          className="absolute top-1/3 left-1/3 w-64 h-64 bg-purple-300/35 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -35, 0],
            y: [0, 20, 0]
          }}
          transition={{ 
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-300/30 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.25, 0.45, 0.25],
            x: [0, 25, 0],
            y: [0, -25, 0]
          }}
          transition={{ 
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
        
        {/* 第三层波浪 */}
        <motion.div 
          className="absolute top-1/2 right-1/3 w-56 h-56 bg-pink-300/40 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.35, 1],
            opacity: [0.35, 0.55, 0.35],
            x: [0, -40, 0],
            y: [0, 30, 0]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/2 w-72 h-72 bg-purple-400/30 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.25, 1],
            opacity: [0.25, 0.4, 0.25],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>
      
      {/* 主要内容 */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
