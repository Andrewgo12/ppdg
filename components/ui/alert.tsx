"use client"

import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"

interface AlertProps {
  type?: "info" | "success" | "warning" | "error"
  title?: string
  message: string
  action?: {
    label: string
    onClick: () => void
  }
}

const STYLES = {
  info: {
    bg: "bg-primary/10",
    border: "border-primary/20",
    text: "text-primary",
    icon: Info,
  },
  success: {
    bg: "bg-accent/10",
    border: "border-accent/20",
    text: "text-accent",
    icon: CheckCircle,
  },
  warning: {
    bg: "bg-chart-3/15",
    border: "border-chart-3/20",
    text: "text-chart-3",
    icon: AlertTriangle,
  },
  error: {
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    text: "text-destructive",
    icon: AlertCircle,
  },
}

export function Alert({ type = "info", title, message, action }: AlertProps) {
  const style = STYLES[type]
  const Icon = style.icon

  return (
    <div className={`rounded-2xl border p-4 ${style.bg} ${style.border}`}>
      <div className="flex items-start gap-3">
        <Icon className={`size-5 shrink-0 ${style.text} mt-0.5`} />
        <div className="flex-1">
          {title && <p className={`text-sm font-semibold ${style.text}`}>{title}</p>}
          <p className={`text-sm ${style.text}`}>{message}</p>
          {action && (
            <button
              onClick={action.onClick}
              className={`mt-2 text-sm font-medium underline transition-opacity hover:opacity-80`}
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
