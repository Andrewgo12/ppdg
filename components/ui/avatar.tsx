"use client"

interface AvatarProps {
  src?: string
  initials: string
  size?: "sm" | "md" | "lg"
  status?: "online" | "offline" | "away"
}

const SIZES = {
  sm: "size-8",
  md: "size-10",
  lg: "size-10",
}

export function Avatar({ src, initials, size = "md", status }: AvatarProps) {
  return (
    <div className="relative inline-flex">
      <div
        className={`flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-semibold text-primary-foreground ${SIZES[size]}`}
      >
        {src ? (
          <img src={src} alt={initials} className="h-full w-full rounded-full object-cover" />
        ) : (
          <span className="text-sm">{initials}</span>
        )}
      </div>
      {status && (
        <div
          className={`absolute bottom-0 right-0 rounded-full border-2 border-card ${
            status === "online" ? "bg-accent" : status === "away" ? "bg-chart-3" : "bg-muted-foreground"
          } ${size === "sm" ? "size-2.5" : size === "md" ? "size-3" : "size-4"}`}
        />
      )}
    </div>
  )
}
