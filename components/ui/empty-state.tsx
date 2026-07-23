"use client"

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex min-h-96 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-muted/50 p-8 text-center">
      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-background">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
