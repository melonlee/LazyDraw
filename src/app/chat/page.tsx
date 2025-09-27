"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Send, 
  ArrowLeft, 
  Settings,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import ChatMessage from "@/components/ChatMessage";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isGenerating?: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m LazyDraw AI Assistant, I can help you create diagrams, answer questions, and assist with creative tasks.\n\nI can help you with:\n• Creating various types of diagrams (flowcharts, mind maps, architecture diagrams, etc.)\n• Answering technical questions\n• Assisting with code writing\n• Providing creative suggestions\n\nWhat can I help you with today?',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle parameters from homepage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialInput = urlParams.get('input');
    if (initialInput) {
      setInputValue(initialInput);
      // Auto send message
      setTimeout(() => {
        handleAutoSubmit(initialInput);
      }, 500);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isGenerating) return;
    submitMessage(inputValue);
  };

  const handleAutoSubmit = (message: string) => {
    if (!message.trim() || isGenerating) return;
    submitMessage(message);
  };

  const submitMessage = (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsGenerating(true);

    // 模拟 AI 响应
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateMockResponse(message),
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsGenerating(false);
    }, 1500 + Math.random() * 1000);
  };

  const generateMockResponse = (input: string): string => {
    const responses = [
      "That's a very interesting question! Let me help you analyze this...",
      "I understand your needs, here are some suggestions:",
      "Based on your description, I think we can handle it this way:",
      "Let me explain this concept in detail for you:",
      "That's a great idea! Let me help you implement it:"
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    if (input.toLowerCase().includes('chart') || input.toLowerCase().includes('diagram') || input.toLowerCase().includes('draw') || input.toLowerCase().includes('flow') || input.toLowerCase().includes('graph')) {
      return `${randomResponse}\n\nI've generated a diagram for you, which you can view below. This diagram shows the relevant processes and structure.\n\nIf you need to modify the diagram or have other questions, please let me know!`;
    }
    
    return `${randomResponse}\n\nIf you need to create diagrams or visual content, I can also help you! Just tell me what type of diagram you want.`;
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 blur-3xl" />
      {/* Top Navigation Bar - Fixed Position */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900">LazyDraw AI</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="relative z-10 flex-1 flex max-w-6xl mx-auto w-full pt-16 pb-20">
        {/* Chat Messages Area */}
        <div className="flex-1 flex flex-col w-full">
          {/* Messages List */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 bg-white/20 backdrop-blur-sm">
            <AnimatePresence>
              {messages.map((message, index) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onRegenerate={() => {
                    // Regenerate last message
                    if (index === messages.length - 1) {
                      // Regeneration logic can be implemented here
                    }
                  }}
                />
              ))}
            </AnimatePresence>

            {/* Generating State */}
            {isGenerating && (
              <ChatMessage
                message={{
                  id: 'generating',
                  content: '',
                  role: 'assistant',
                  timestamp: new Date(),
                  isGenerating: true
                }}
              />
            )}

            <div ref={messagesEndRef} />
          </div>

      {/* Input Area - Fixed Position */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-gray-200 bg-white/80 backdrop-blur-sm px-4 py-4">
            <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
              <div className="relative">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Enter your question or request..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isGenerating}
                  className="w-full h-12 pl-4 pr-14 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-0 bg-white text-gray-900 placeholder:text-gray-500 shadow-sm"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!inputValue.trim() || isGenerating}
                  className="absolute right-1 top-1 h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg transition-all duration-200 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
