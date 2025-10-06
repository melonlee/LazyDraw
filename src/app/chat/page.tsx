"use client"

import { useSearchParams } from "next/navigation"
import AIAssistantUI from "./components/AIAssistantUI"

export default function Page() {
  const searchParams = useSearchParams()
  const initialInput = searchParams.get('input') || ""

  return <AIAssistantUI initialInput={initialInput} />
}
