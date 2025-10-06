"use client"
import { useState } from "react"
import { User, Globe, HelpCircle, Crown, BookOpen, LogOut, ChevronRight } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

export default function SettingsPopover({ children }) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>{children}</div>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start" side="top">
        <div className="p-4">
          <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">j@gmail.com</div>

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

          <div className="space-y-1">
            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">Settings</div>

            <button className="flex items-center gap-3 w-full p-2 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
              <Globe className="h-4 w-4" />
              <span>Language</span>
              <ChevronRight className="h-4 w-4 ml-auto" />
            </button>

            <button className="flex items-center gap-3 w-full p-2 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
              <HelpCircle className="h-4 w-4" />
              <span>Get help</span>
            </button>

            <button className="flex items-center gap-3 w-full p-2 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
              <Crown className="h-4 w-4" />
              <span>Upgrade plan</span>
            </button>

            <button className="flex items-center gap-3 w-full p-2 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
              <BookOpen className="h-4 w-4" />
              <span>Learn more</span>
              <ChevronRight className="h-4 w-4 ml-auto" />
            </button>

            <button className="flex items-center gap-3 w-full p-2 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
