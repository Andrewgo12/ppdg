"use client"

import { AlertCircle, CheckCircle, Info, X } from "lucide-react"
import { useState } from "react"

interface ToastProps {
  type?: "success" | "error" | "info" | "warning"
  message: string
  onClose?: () => void
  autoClose?: number
}

const ICONS = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertCircle,
}

const STYLES = {
  success: "bg-accent/10 text-accent border-accent/20",
  error: "bg-destructive/10 text-destructive border-destructive/20",
  info: "bg-primary/10 text-primary border-primary/20",
  warning: "bg-chart-3/15 text-chart-3 border-chart-3/20",
}

export function Toast({ type = "info", message, onClose, autoClose = 4000 }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useState(() => {
    if (autoClose && visible) {
      const timer = setTimeout(() => {
        setVisible(false)
        onClose?.()
      }, autoClose)
      return () => clearTimeout(timer)
    }
  }, [autoClose, visible, onClose])

  if (!visible) return null

  const Icon = ICONS[type]

  return (
    <div className={`flex items-center gap-3 rounded-2xl border p-4 ${STYLES[type]}`}>
      <Icon className="size-5 shrink-0" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => {
          setVisible(false)
          onClose?.()
        }}
        className="rounded p-1 transition-colors hover:bg-black/10"
      >
        <X className="size-4" />
      </button>
    </div>
  )
}
