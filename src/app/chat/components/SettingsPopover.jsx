"use client"
import { useState } from "react"
import { User, Globe, HelpCircle, Crown, BookOpen, LogOut, ChevronRight } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

export default function SettingsPopover({ children, systemPrompt, setSystemPrompt, temperature, setTemperature }) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>{children}</div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start" side="top">
        <div className="p-4">
          <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">Assistant Settings</div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 mb-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">Personal</span>
            </div>
            <div className="ml-auto">
              <div className="text-xs text-zinc-500">Pro plan</div>
            </div>
            <div className="text-blue-500">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">System Prompt</div>
              <textarea
                value={systemPrompt || ""}
                onChange={(e) => setSystemPrompt?.(e.target.value)}
                rows={3}
                placeholder="可选：给助手一个系统角色/指令"
                className="w-full resize-y rounded-lg border border-zinc-300 bg-transparent p-2 text-sm outline-none dark:border-zinc-700"
              />
            </div>
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                <span>Temperature</span>
                <span className="tabular-nums">{typeof temperature === 'number' ? temperature.toFixed(2) : '0.70'}</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={typeof temperature === 'number' ? temperature : 0.7}
                onChange={(e) => setTemperature?.(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
