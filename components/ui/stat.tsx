"use client"

interface StatProps {
  label: string
  value: string | number
  change?: {
    value: number
    isPositive: boolean
  }
  icon?: React.ReactNode
}

export function Stat({ label, value, change, icon }: StatProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
          {change && (
            <p
              className={`mt-1 text-xs font-medium ${
                change.isPositive ? "text-accent" : "text-destructive"
              }`}
            >
              {change.isPositive ? "+" : "-"}{Math.abs(change.value)}%
            </p>
          )}
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
    </div>
  )
}
