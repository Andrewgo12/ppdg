"use client"

interface TimelineItem {
  title: string
  description: string
  time: string
  icon: React.ReactNode
  status: "completed" | "pending" | "failed"
}

interface TimelineProps {
  items: TimelineItem[]
}

const STATUS_STYLES = {
  completed: "bg-accent text-accent-foreground",
  pending: "bg-primary text-primary-foreground",
  failed: "bg-destructive text-destructive-foreground",
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2 sm:gap-3">
          <div className="flex flex-col items-center">
            <div className={`rounded-full p-3 ${STATUS_STYLES[item.status]}`}>
              {item.icon}
            </div>
            {index < items.length - 1 && <div className="mt-1 h-9 sm:h-8 sm:h-9 w-0.5 bg-border" />}
          </div>
          <div className="pb-4">
            <p className="text-sm font-semibold text-foreground">{item.title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
            <p className="mt-1 text-xs font-medium text-muted-foreground">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
