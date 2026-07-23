"use client"

interface ProgressProps {
  value: number
  max?: number
  label?: string
  showPercentage?: boolean
  variant?: "default" | "success" | "warning" | "error"
}

const VARIANTS = {
  default: "bg-primary",
  success: "bg-accent",
  warning: "bg-chart-3",
  error: "bg-destructive",
}

export function Progress({ value, max = 100, label, showPercentage, variant = "default" }: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className="space-y-1.5">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="font-medium text-foreground">{label}</span>}
          {showPercentage && <span className="text-muted-foreground">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all ${VARIANTS[variant]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
