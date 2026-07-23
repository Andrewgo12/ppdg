"use client"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "secondary" | "destructive" | "accent"
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    destructive: "bg-destructive/10 text-destructive",
    accent: "bg-accent/10 text-accent",
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  )
}
