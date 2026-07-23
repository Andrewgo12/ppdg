"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface CollapsibleProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  icon?: React.ReactNode
}

export function Collapsible({ title, children, defaultOpen = false, icon }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-border rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 p-4 hover:bg-muted transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-muted-foreground">{icon}</span>}
          <span className="font-medium text-foreground text-left">{title}</span>
        </div>
        <ChevronDown
          className={`size-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && <div className="border-t border-border p-4 bg-muted/50">{children}</div>}
    </div>
  )
}
