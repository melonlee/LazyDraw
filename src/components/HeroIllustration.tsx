"use client";

import { motion } from "framer-motion";

export default function HeroIllustration() {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80">
      {/* 背景圆形 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 rounded-full"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      {/* 主要人物插画 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* 人物主体 */}
          <div className="relative">
            {/* 头部 */}
            <motion.div
              className="w-20 h-20 bg-gray-800 rounded-full relative"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {/* 眼睛 */}
              <div className="absolute top-6 left-4 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute top-6 right-4 w-2 h-2 bg-white rounded-full"></div>
              {/* 嘴巴 */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-gray-600 rounded-full"></div>
            </motion.div>
            
            {/* 身体 */}
            <div className="w-24 h-24 bg-gray-700 rounded-full relative -mt-2">
              {/* 手臂 */}
              <motion.div
                className="absolute top-4 -left-2 w-8 h-3 bg-gray-600 rounded-full"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-4 -right-2 w-8 h-3 bg-gray-600 rounded-full"
                animate={{ rotate: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
            
            {/* 望远镜 */}
            <motion.div
              className="absolute top-8 -right-6"
              animate={{ 
                rotate: [0, 5, 0],
                x: [0, 2, 0]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <div className="w-12 h-2 bg-gray-500 rounded-full relative">
                <div className="absolute right-0 top-0 w-4 h-2 bg-gray-400 rounded-full"></div>
                <div className="absolute right-1 top-0 w-2 h-1 bg-gray-300 rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* 装饰性云朵 */}
      <motion.div
        className="absolute -top-8 -left-6 w-16 h-10 bg-white/70 rounded-full"
        animate={{ 
          y: [0, -8, 0],
          x: [0, 3, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute top-2 left-2 w-4 h-3 bg-white/50 rounded-full"></div>
        <div className="absolute top-1 right-3 w-3 h-2 bg-white/40 rounded-full"></div>
      </motion.div>
      
      <motion.div
        className="absolute -top-4 -right-8 w-12 h-8 bg-white/50 rounded-full"
        animate={{ 
          y: [0, 6, 0],
          x: [0, -2, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute top-1 left-1 w-3 h-2 bg-white/40 rounded-full"></div>
        <div className="absolute top-2 right-2 w-2 h-1 bg-white/30 rounded-full"></div>
      </motion.div>
      
      {/* 浮动装饰元素 */}
      <motion.div
        className="absolute top-8 right-4 w-6 h-6 bg-yellow-300/80 rounded-full"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      <motion.div
        className="absolute bottom-8 left-4 w-4 h-4 bg-pink-300/80 rounded-full"
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.5, 1, 0.5],
          y: [0, -5, 0]
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      
      <motion.div
        className="absolute top-1/2 -left-4 w-3 h-3 bg-blue-300/80 rounded-full"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
          x: [0, 3, 0]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* 思考气泡 */}
      <motion.div
        className="absolute -top-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
          y: [0, -10, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          delay: 1
        }}
      >
        <div className="relative">
          <div className="w-8 h-6 bg-white/90 rounded-full border-2 border-gray-200"></div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/90 rotate-45 border-r border-b border-gray-200"></div>
        </div>
      </motion.div>
    </div>
  );
}
