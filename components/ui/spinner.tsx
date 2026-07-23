"use client"

export function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "size-4",
    md: "size-8",
    lg: "size-10",
  }

  return (
    <div className={`inline-block animate-spin rounded-full border-4 border-muted border-t-primary ${sizes[size]}`} />
  )
}

export function LoadingOverlay({ message = "Cargando..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-sm font-medium text-white">{message}</p>
      </div>
    </div>
  )
}
