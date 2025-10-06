import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function SidebarSection({ icon, title, children, collapsed, onToggle }) {
  return (
    <section>
      <button
        onClick={onToggle}
        className="sticky top-0 z-10 -mx-2 mb-1 flex w-[calc(100%+16px)] items-center gap-2 border-y border-transparent bg-gradient-to-b from-white to-white/70 px-2 py-2 text-[11px] font-semibold tracking-wide text-zinc-500 backdrop-blur hover:text-zinc-700 dark:from-zinc-900 dark:to-zinc-900/70 dark:hover:text-zinc-300"
        aria-expanded={!collapsed}
      >
        <span className="mr-1" aria-hidden>
          {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </span>
        <span className="flex items-center gap-2">
          <span className="opacity-70" aria-hidden>
            {icon}
          </span>
          {title}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="space-y-0.5"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
