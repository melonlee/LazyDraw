"use client"
import { motion, AnimatePresence } from "framer-motion"
import { X, Lightbulb } from "lucide-react"
import { useState } from "react"

export default function CreateTemplateModal({ isOpen, onClose, onCreateTemplate, editingTemplate = null }) {
  const [templateName, setTemplateName] = useState(editingTemplate?.name || "")
  const [templateContent, setTemplateContent] = useState(editingTemplate?.content || "")

  const isEditing = !!editingTemplate

  const handleSubmit = (e) => {
    e.preventDefault()
    if (templateName.trim() && templateContent.trim()) {
      const templateData = {
        name: templateName.trim(),
        content: templateContent.trim(),
        snippet: templateContent.trim().slice(0, 100) + (templateContent.trim().length > 100 ? "..." : ""),
        createdAt: editingTemplate?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      if (isEditing) {
        onCreateTemplate({ ...templateData, id: editingTemplate.id })
      } else {
        onCreateTemplate(templateData)
      }

      handleCancel()
    }
  }

  const handleCancel = () => {
    setTemplateName("")
    setTemplateContent("")
    onClose()
  }

  // Update form when editingTemplate changes
  useState(() => {
    if (editingTemplate) {
      setTemplateName(editingTemplate.name || "")
      setTemplateContent(editingTemplate.content || "")
    }
  }, [editingTemplate])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60"
            onClick={handleCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{isEditing ? "Edit Template" : "Create Template"}</h2>
              <button onClick={handleCancel} className="rounded-lg p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="templateName" className="block text-sm font-medium mb-2">
                  Template Name
                </label>
                <input
                  id="templateName"
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="E.g. Email Response, Code Review, Meeting Notes"
                  className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800"
                  autoFocus
                />
              </div>

              <div>
                <label htmlFor="templateContent" className="block text-sm font-medium mb-2">
                  Template Content
                </label>
                <textarea
                  id="templateContent"
                  value={templateContent}
                  onChange={(e) => setTemplateContent(e.target.value)}
                  placeholder="Enter your template content here. This will be inserted into the chat when you use the template."
                  rows={8}
                  className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 resize-none"
                />
              </div>

              <div className="flex items-start gap-3 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
                <Lightbulb className="h-5 w-5 text-zinc-500 mt-0.5 shrink-0" />
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  <div className="font-medium mb-1">Pro tip</div>
                  <div>
                    Templates are perfect for frequently used prompts, instructions, or conversation starters. They'll
                    be inserted directly into your chat input when selected.
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!templateName.trim() || !templateContent.trim()}
                  className="flex-1 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                >
                  {isEditing ? "Update Template" : "Create Template"}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
