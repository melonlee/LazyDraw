"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Bot, 
  User, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  Download,
  RefreshCw,
  Eye,
  EyeOff
} from "lucide-react";
import { cn } from "@/lib/utils";
import { generateMockMermaidFromIntent } from "@/lib/mermaid";
import ExcalidrawCanvas from "./ExcalidrawCanvas";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isGenerating?: boolean;
  hasDiagram?: boolean;
  diagramContent?: string;
}

interface ChatMessageProps {
  message: Message;
  onRegenerate?: () => void;
}

export default function ChatMessage({ message, onRegenerate }: ChatMessageProps) {
  const [showDiagram, setShowDiagram] = useState(true); // 默认打开图表预览
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const generateDiagram = () => {
    if (message.content.toLowerCase().includes('图表') || 
        message.content.toLowerCase().includes('图') || 
        message.content.toLowerCase().includes('draw') ||
        message.content.toLowerCase().includes('flow') ||
        message.content.toLowerCase().includes('diagram')) {
      return generateMockMermaidFromIntent(message.content);
    }
    return null;
  };

  const diagramContent = generateDiagram();
  const shouldShowDiagram = diagramContent && message.role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex gap-3 group",
        message.role === 'user' ? 'ml-auto flex-row-reverse max-w-4xl' : 'mr-auto max-w-6xl'
      )}
    >
      {/* 头像 */}
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
        message.role === 'user' 
          ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
          : 'bg-gradient-to-r from-green-500 to-teal-500'
      )}>
        {message.role === 'user' ? (
          <User className="h-4 w-4 text-white" />
        ) : (
          <Bot className="h-4 w-4 text-white" />
        )}
      </div>

      {/* 消息内容 */}
      <div className={cn(
        "flex flex-col gap-2",
        message.role === 'user' ? 'items-end' : 'items-start'
      )}>
        <div className={cn(
          "px-4 py-3 rounded-2xl shadow-sm relative w-full",
          message.role === 'user'
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
            : 'bg-white border border-gray-200 text-gray-900'
        )}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </div>
          
          {/* Generating Animation */}
          {message.isGenerating && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-xs text-gray-500">AI is thinking...</span>
            </div>
          )}
        </div>

        {/* Diagram Rendering Area */}
        {shouldShowDiagram && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full"
          >
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-3 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Diagram Preview</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDiagram(!showDiagram)}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                  >
                    {showDiagram ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              {showDiagram && (
                <div className="h-96">
                  <ExcalidrawCanvas 
                    mermaid={diagramContent} 
                    className="w-full h-full" 
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
        
        {/* Message Action Buttons */}
        {message.role === 'assistant' && !message.isGenerating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(message.content)}
              className={cn(
                "h-6 w-6 p-0 text-gray-400 hover:text-gray-600 transition-colors",
                copied && "text-green-500"
              )}
            >
              <Copy className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
            >
              <ThumbsUp className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
            >
              <ThumbsDown className="h-3 w-3" />
            </Button>
            {onRegenerate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRegenerate}
                className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
              >
                <RefreshCw className="h-3 w-3" />
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
