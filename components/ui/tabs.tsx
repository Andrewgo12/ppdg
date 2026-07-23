"use client"

import { useState } from "react"

export interface TabItem {
  id: string
  label: string
  badge?: number
  content: React.ReactNode
}

interface TabsProps {
  items: TabItem[]
  defaultTab?: string
}

export function Tabs({ items, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id)

  const activeContent = items.find((item) => item.id === activeTab)?.content

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 border-b border-border">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`relative px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === item.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.label}
            {item.badge && (
              <span className="ml-2 inline-flex size-5 items-center justify-center rounded-full bg-destructive text-xs font-semibold text-destructive-foreground">
                {item.badge}
              </span>
            )}
            {activeTab === item.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>
      <div>{activeContent}</div>
    </div>
  )
}
