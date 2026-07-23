"use client"

interface CommentProps {
  author: string
  avatar?: string
  initials: string
  timestamp: string
  message: string
  actions?: Array<{
    label: string
    onClick: () => void
  }>
}

export function Comment({ author, avatar, initials, timestamp, message, actions }: CommentProps) {
  return (
    <div className="flex gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-semibold text-primary-foreground">
        {avatar ? <img src={avatar} alt={author} className="rounded-full" /> : initials}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">{author}</span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <p className="mt-1 text-sm text-foreground">{message}</p>
        {actions && actions.length > 0 && (
          <div className="mt-2 flex gap-3">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="text-xs font-medium text-primary transition-colors hover:underline"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
