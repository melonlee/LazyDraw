"use client"

import React, { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import AIAssistantUI from "./components/AIAssistantUI"

function ChatContent() {
  const searchParams = useSearchParams()
  const initialInput = searchParams.get('input') || ""
  return <AIAssistantUI initialInput={initialInput} />
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ChatContent />
    </Suspense>
  )
}
