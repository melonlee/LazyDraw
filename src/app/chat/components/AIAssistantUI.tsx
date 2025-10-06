"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { Calendar, LayoutGrid, MoreHorizontal } from "lucide-react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import ChatPane from "./ChatPane"
import GhostIconButton from "./GhostIconButton"
// import ThemeToggle from "./ThemeToggle"
import { INITIAL_CONVERSATIONS, INITIAL_TEMPLATES, INITIAL_FOLDERS } from "./mockData"

type AIAssistantUIProps = {
  initialInput?: string
}

export default function AIAssistantUI({ initialInput = "" }: AIAssistantUIProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>("light")

  useEffect(() => {
    try {
      if (theme === "dark") document.documentElement.classList.add("dark")
      else document.documentElement.classList.remove("dark")
      document.documentElement.setAttribute("data-theme", theme)
      document.documentElement.style.colorScheme = theme as any
      localStorage.setItem("theme", theme)
    } catch {}
  }, [theme])

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme")
      if (saved === "light" || saved === "dark") {
        setTheme(saved)
        return
      }
      const media = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)")
      if (media?.matches) setTheme("dark")
      const listener = (e: MediaQueryListEvent) => setTheme(e.matches ? "dark" : "light")
      media?.addEventListener("change", listener)
      return () => media?.removeEventListener("change", listener)
    } catch {}
  }, [])

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(() => {
    try {
      const raw = localStorage.getItem("sidebar-collapsed")
      return raw ? JSON.parse(raw) : { pinned: true, recent: false, folders: true, templates: true }
    } catch {
      return { pinned: true, recent: false, folders: true, templates: true }
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem("sidebar-collapsed", JSON.stringify(collapsed))
    } catch {}
  }, [collapsed])

  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem("sidebar-collapsed-state")
      return saved ? JSON.parse(saved) : false
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem("sidebar-collapsed-state", JSON.stringify(sidebarCollapsed))
    } catch {}
  }, [sidebarCollapsed])

  type Conversation = any

  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [templates, setTemplates] = useState<any[]>([])
  const [folders, setFolders] = useState<any[]>([])

  const [query, setQuery] = useState("")
  const searchRef = useRef<HTMLInputElement | null>(null)

  const [isThinking, setIsThinking] = useState(false)
  const [systemPrompt, setSystemPrompt] = useState("")
  const [temperature, setTemperature] = useState(0.7)
  const [thinkingConvId, setThinkingConvId] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "n") {
        e.preventDefault()
        createNewChat()
      }
      if (!e.metaKey && !e.ctrlKey && e.key === "/") {
        const tag = (document.activeElement as HTMLElement | null)?.tagName?.toLowerCase()
        if (tag !== "input" && tag !== "textarea") {
          e.preventDefault()
          searchRef.current?.focus()
        }
      }
      if (e.key === "Escape" && sidebarOpen) setSidebarOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [sidebarOpen])

  // 将包含时间/随机数的初始数据延后到客户端注入，避免 SSR 水合不一致
  useEffect(() => {
    setConversations(INITIAL_CONVERSATIONS as any)
    setTemplates(INITIAL_TEMPLATES as any)
    setFolders(INITIAL_FOLDERS as any)
    
    // 如果存在 initialInput，直接创建新会话
    if (initialInput && initialInput.trim()) {
      setTimeout(() => {
        createNewChat(initialInput.trim())
      }, 100)
    }
  }, [])

  // 默认创建空白会话：当没有选择且没有 initialInput 时
  const [hasCreatedDefaultChat, setHasCreatedDefaultChat] = useState(false)
  useEffect(() => {
    if (!selectedId && conversations.length > 0 && !initialInput && !hasCreatedDefaultChat) {
      setHasCreatedDefaultChat(true)
      const timer = setTimeout(() => {
        createNewChat()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [selectedId, conversations.length, initialInput, hasCreatedDefaultChat])

  const filtered = useMemo(() => {
    if (!query.trim()) return conversations
    const q = query.toLowerCase()
    return conversations.filter((c: any) => c.title.toLowerCase().includes(q) || c.preview.toLowerCase().includes(q))
  }, [conversations, query])

  const pinned = filtered.filter((c: any) => c.pinned).sort((a: any, b: any) => (a.updatedAt < b.updatedAt ? 1 : -1))

  const recent = filtered
    .filter((c: any) => !c.pinned)
    .sort((a: any, b: any) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, 10)

  const folderCounts = React.useMemo(() => {
    const map: Record<string, number> = Object.fromEntries(folders.map((f: any) => [f.name, 0]))
    for (const c of conversations) if (map[(c as any).folder] != null) map[(c as any).folder] += 1
    return map
  }, [conversations, folders])

  function togglePin(id: string) {
    setConversations((prev) => prev.map((c: any) => (c.id === id ? { ...c, pinned: !c.pinned } : c)))
  }

  function createNewChat(firstMessage?: unknown) {
    const id = Math.random().toString(36).slice(2)
    const now = new Date().toISOString()

    const messages = [] as any[]
    const initialText = typeof firstMessage === "string" ? firstMessage.trim() : ""
    if (initialText) {
      messages.push({ id: Math.random().toString(36).slice(2), role: "user", content: initialText, createdAt: now })
    }

    const item = {
      id,
      title: initialText ? initialText.slice(0, 24) || "New Chat" : "New Chat",
      updatedAt: now,
      messageCount: messages.length,
      preview: initialText ? initialText.slice(0, 80) : "Say hello to start...",
      pinned: false,
      folder: "Work Projects",
      messages,
    }
    setConversations((prev) => [item, ...prev])
    setSelectedId(id)
    setSidebarOpen(false)

    if (messages.length > 0) {
      setIsThinking(true)
      setThinkingConvId(id)
      const currentConvId = id
      setTimeout(() => {
        setIsThinking(false)
        setThinkingConvId(null)
        setConversations((prev) =>
          prev.map((c: any) => {
            if (c.id !== currentConvId) return c
            const asstMsg = {
              id: Math.random().toString(36).slice(2),
              role: "assistant",
              content: `Got it — I'll help with that.`,
              createdAt: new Date().toISOString(),
            }
            const msgs = [...(c.messages || []), asstMsg]
            return {
              ...c,
              messages: msgs,
              updatedAt: new Date().toISOString(),
              messageCount: msgs.length,
              preview: asstMsg.content.slice(0, 80),
            }
          }),
        )
      }, 2000)
    }
  }

  function createFolder() {
    const name = prompt("Folder name")
    if (!name) return
    if (folders.some((f: any) => f.name.toLowerCase() === name.toLowerCase())) return alert("Folder already exists.")
    setFolders((prev) => [...prev, { id: Math.random().toString(36).slice(2), name }])
  }

  async function sendMessage(convId: string, content: string) {
    if (!content.trim()) return
    const now = new Date().toISOString()
    const userMsg = { id: Math.random().toString(36).slice(2), role: "user", content, createdAt: now }

    setConversations((prev) =>
      prev.map((c: any) => {
        if (c.id !== convId) return c
        const msgs = [...(c.messages || []), userMsg]
        return {
          ...c,
          messages: msgs,
          updatedAt: now,
          messageCount: msgs.length,
          preview: content.slice(0, 80),
        }
      }),
    )

    setIsThinking(true)
    setThinkingConvId(convId)

    const currentConvId = convId
    try {
      const currentConv = (conversations as any[]).find((c: any) => c.id === currentConvId)
      const history = Array.isArray(currentConv?.messages) ? currentConv.messages : []
      const payloadMessages = [
        ...(systemPrompt?.trim() ? [{ role: "system", content: systemPrompt.trim() }] : []),
        ...history,
        userMsg,
      ]
        .filter((m: any) => m && typeof m.content === "string" && m.content.trim())
        .map((m: any) => ({ role: m.role, content: m.content }))

      const resp = await fetch("/api/chat?stream=1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages, temperature }),
      })
      if (!resp.ok || !resp.body) {
        const errText = await resp.text().catch(() => "")
        throw new Error(errText || "Stream failed")
      }

      // Append an empty assistant message first, then stream into it
      const seedId = Math.random().toString(36).slice(2)
      setConversations((prev) =>
        prev.map((c: any) => {
          if (c.id !== currentConvId) return c
          const asstMsg = { id: seedId, role: "assistant", content: "", createdAt: new Date().toISOString() }
          const msgs = [...(c.messages || []), asstMsg]
          return {
            ...c,
            messages: msgs,
            updatedAt: new Date().toISOString(),
            messageCount: msgs.length,
            preview: "",
          }
        }),
      )

      const reader = resp.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ""
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        accumulated += chunk
        const contentDelta = chunk
        if (contentDelta) {
          const delta = contentDelta
          setConversations((prev) =>
            prev.map((c: any) => {
              if (c.id !== currentConvId) return c
              const msgs = (c.messages || []).map((m: any) =>
                m.id === seedId ? { ...m, content: (m.content || "") + delta } : m,
              )
              return {
                ...c,
                messages: msgs,
                preview: (msgs[msgs.length - 1]?.content || "").slice(0, 80),
                updatedAt: new Date().toISOString(),
              }
            }),
          )
        }
      }

      setIsThinking(false)
      setThinkingConvId(null)
      setErrorMessage(null)
    } catch (e: any) {
      setIsThinking(false)
      setThinkingConvId(null)
      setErrorMessage(String(e?.message || e) || "Unknown error")
      setConversations((prev) =>
        prev.map((c: any) => {
          if (c.id !== currentConvId) return c
          const asstMsg = {
            id: Math.random().toString(36).slice(2),
            role: "assistant",
            content: `Error: ${String(e?.message || e)}`,
            createdAt: new Date().toISOString(),
          }
          const msgs = [...(c.messages || []), asstMsg]
          return {
            ...c,
            messages: msgs,
            updatedAt: new Date().toISOString(),
            messageCount: msgs.length,
            preview: asstMsg.content.slice(0, 80),
          }
        }),
      )
    }
  }

  function retryLast(convId: string) {
    const conv = (conversations as any[]).find((c: any) => c.id === convId)
    if (!conv) return
    const msgs = Array.isArray(conv.messages) ? conv.messages : []
    const lastUser = [...msgs].reverse().find((m: any) => m.role === "user")
    if (lastUser?.content) {
      setErrorMessage(null)
      sendMessage(convId, lastUser.content)
    }
  }

  function editMessage(convId: string, messageId: string, newContent: string) {
    const now = new Date().toISOString()
    setConversations((prev) =>
      prev.map((c: any) => {
        if (c.id !== convId) return c
        const msgs = (c.messages || []).map((m: any) => (m.id === messageId ? { ...m, content: newContent, editedAt: now } : m))
        return {
          ...c,
          messages: msgs,
          preview: msgs[msgs.length - 1]?.content?.slice(0, 80) || c.preview,
        }
      }),
    )
  }

  function resendMessage(convId: string, messageId: string) {
    const conv = (conversations as any[]).find((c: any) => c.id === convId)
    const msg = conv?.messages?.find((m: any) => m.id === messageId)
    if (!msg) return
    sendMessage(convId, msg.content)
  }

  function pauseThinking() {
    setIsThinking(false)
    setThinkingConvId(null)
  }

  function handleUseTemplate(template: any) {
    if (composerRef.current) {
      ;(composerRef.current as any).insertTemplate(template.content)
    }
  }

  const composerRef = useRef<any>(null)
  const ChatPaneAny = ChatPane as any

  const selected = (conversations as any[]).find((c: any) => c.id === selectedId) || null

  return (
    <div
      className="h-screen w-full bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100"
      style={{
        // Keep chat borders consistent and unaffected by outer globals
        ["--border" as any]: theme === "dark" ? "0 0% 14.9%" : "0 0% 89.8%",
      }}
    >
      <div className="md:hidden sticky top-0 z-40 flex items-center gap-2 border-b border-zinc-200/60 bg-white/80 px-3 py-2 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
        <div className="ml-1 flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="inline-flex h-4 w-4 items-center justify-center">✱</span> LazyDraw
        </div>
        <div className="ml-auto flex items-center gap-2">
          <GhostIconButton label="Schedule">
            <Calendar className="h-4 w-4" />
          </GhostIconButton>
          <GhostIconButton label="Apps">
            <LayoutGrid className="h-4 w-4" />
          </GhostIconButton>
          <GhostIconButton label="More">
            <MoreHorizontal className="h-4 w-4" />
          </GhostIconButton>
          {/* 移除主题切换按钮 */}
        </div>
      </div>

      <div className="flex h-[calc(100vh-0px)]">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          theme={theme}
          setTheme={setTheme}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed as unknown as (value: boolean) => void}
          conversations={conversations}
          pinned={pinned}
          recent={recent}
          folders={folders}
          folderCounts={folderCounts}
          selectedId={selectedId}
          onSelect={(id: string) => setSelectedId(id)}
          togglePin={togglePin}
          query={query}
          setQuery={setQuery}
          searchRef={searchRef}
          createFolder={createFolder}
          createNewChat={createNewChat}
          templates={templates}
          setTemplates={setTemplates}
          onUseTemplate={handleUseTemplate}
        />

        <main className="relative flex min-w-0 flex-1 flex-col">
          <Header
            createNewChat={createNewChat}
            sidebarCollapsed={sidebarCollapsed}
            setSidebarOpen={setSidebarOpen}
            systemPrompt={systemPrompt}
            setSystemPrompt={setSystemPrompt}
            temperature={temperature}
            setTemperature={setTemperature}
          />
          <ChatPaneAny
            ref={composerRef}
            conversation={selected as any}
            onSend={(content: string) => selectedId && sendMessage(selectedId, content)}
            onEditMessage={(messageId: string, newContent: string) => selectedId && editMessage(selectedId, messageId, newContent)}
            onResendMessage={(messageId: string) => selectedId && resendMessage(selectedId, messageId)}
            isThinking={isThinking && thinkingConvId === (selected as any)?.id}
            onPauseThinking={pauseThinking}
            errorMessage={errorMessage}
            onRetry={() => selectedId && retryLast(selectedId)}
          />
        </main>
      </div>
    </div>
  )
}


