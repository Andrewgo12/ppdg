"use client"

interface DividerProps {
  text?: string
  variant?: "default" | "dashed"
}

export function Divider({ text, variant = "default" }: DividerProps) {
  if (text) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <div className={`flex-1 h-px ${variant === "dashed" ? "border-t border-dashed" : "bg-border"}`} />
        <span className="text-xs font-medium text-muted-foreground">{text}</span>
        <div className={`flex-1 h-px ${variant === "dashed" ? "border-t border-dashed" : "bg-border"}`} />
      </div>
    )
  }

  return (
    <div className={`h-px w-full ${variant === "dashed" ? "border-t border-dashed border-border" : "bg-border"}`} />
  )
}
