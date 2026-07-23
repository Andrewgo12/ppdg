"use client"

interface CardProps {
  title?: string
  subtitle?: string
  children: React.ReactNode
  footer?: React.ReactNode
  highlighted?: boolean
}

export function Card({ title, subtitle, children, footer, highlighted }: CardProps) {
  return (
    <div
      className={`rounded-2xl border p-5 transition-all ${
        highlighted
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border bg-card hover:border-primary/40"
      }`}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-sm font-semibold text-foreground">{title}</h3>}
          {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      <div>{children}</div>
      {footer && <div className="mt-4 border-t border-border pt-4">{footer}</div>}
    </div>
  )
}
