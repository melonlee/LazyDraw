"use client"
import { motion, AnimatePresence } from "framer-motion"
import { X, SearchIcon, Plus, Clock } from "lucide-react"
import { useState, useEffect, useMemo } from "react"

function getTimeGroup(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

  if (date >= today) return "Today"
  if (date >= yesterday) return "Yesterday"
  if (date >= sevenDaysAgo) return "Previous 7 Days"
  return "Older"
}

export default function SearchModal({
  isOpen,
  onClose,
  conversations,
  selectedId,
  onSelect,
  togglePin,
  createNewChat,
}) {
  const [query, setQuery] = useState("")

  const filteredConversations = useMemo(() => {
    if (!query.trim()) return conversations
    const q = query.toLowerCase()
    return conversations.filter((c) => c.title.toLowerCase().includes(q) || c.preview.toLowerCase().includes(q))
  }, [conversations, query])

  const groupedConversations = useMemo(() => {
    const groups = {
      Today: [],
      Yesterday: [],
      "Previous 7 Days": [],
      Older: [],
    }

    filteredConversations
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .forEach((conv) => {
        const group = getTimeGroup(conv.updatedAt)
        groups[group].push(conv)
      })

    return groups
  }, [filteredConversations])

  const handleClose = () => {
    setQuery("")
    onClose()
  }

  const handleNewChat = () => {
    createNewChat()
    handleClose()
  }

  const handleSelectConversation = (id) => {
    onSelect(id)
    handleClose()
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") handleClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-2xl -translate-x-1/2 rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            {/* Search Header */}
            <div className="flex items-center gap-3 border-b border-zinc-200 p-4 dark:border-zinc-800">
              <SearchIcon className="h-5 w-5 text-zinc-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search chats..."
                className="flex-1 bg-transparent text-lg outline-none placeholder:text-zinc-400"
                autoFocus
              />
              <button onClick={handleClose} className="rounded-lg p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {/* New Chat Option */}
              <div className="border-b border-zinc-200 p-2 dark:border-zinc-800">
                <button
                  onClick={handleNewChat}
                  className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <Plus className="h-5 w-5 text-zinc-500" />
                  <span className="font-medium">New chat</span>
                </button>
              </div>

              {/* Conversation Groups */}
              {Object.entries(groupedConversations).map(([groupName, convs]) => {
                if (convs.length === 0) return null

                return (
                  <div key={groupName} className="border-b border-zinc-200 p-2 last:border-b-0 dark:border-zinc-800">
                    <div className="px-3 py-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">{groupName}</div>
                    <div className="space-y-1">
                      {convs.map((conv) => (
                        <button
                          key={conv.id}
                          onClick={() => handleSelectConversation(conv.id)}
                          className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                          <Clock className="h-4 w-4 text-zinc-400 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="truncate font-medium">{conv.title}</div>
                            <div className="truncate text-sm text-zinc-500 dark:text-zinc-400">{conv.preview}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}

              {/* Empty State */}
              {filteredConversations.length === 0 && query.trim() && (
                <div className="p-8 text-center">
                  <SearchIcon className="mx-auto h-12 w-12 text-zinc-300 dark:text-zinc-600" />
                  <div className="mt-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">No chats found</div>
                  <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    Try searching with different keywords
                  </div>
                </div>
              )}

              {/* Default State - Show all conversations when no query */}
              {!query.trim() && conversations.length === 0 && (
                <div className="p-8 text-center">
                  <div className="text-lg font-medium text-zinc-900 dark:text-zinc-100">No conversations yet</div>
                  <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Start a new chat to begin</div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
