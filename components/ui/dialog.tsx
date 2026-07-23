"use client"

import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react"

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  title: string
  message: string
  type?: "confirm" | "success" | "error" | "info"
  confirmText?: string
  cancelText?: string
}

const ICONS = {
  confirm: AlertCircle,
  success: CheckCircle,
  error: XCircle,
  info: Info,
}

const COLORS = {
  confirm: "text-primary",
  success: "text-accent",
  error: "text-destructive",
  info: "text-primary",
}

export function Dialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "confirm",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: DialogProps) {
  if (!isOpen) return null

  const Icon = ICONS[type]
  const colorClass = COLORS[type]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-4 shadow-lg">
        <div className="mb-4 flex items-start gap-3">
          <Icon className={`size-6 shrink-0 ${colorClass}`} />
          <div>
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{message}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            {cancelText}
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="flex-1 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
