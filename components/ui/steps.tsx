"use client"

interface StepItem {
  label: string
  description?: string
}

interface StepsProps {
  items: StepItem[]
  currentStep: number
  onStepClick?: (step: number) => void
}

export function Steps({ items, currentStep, onStepClick }: StepsProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isActive = index + 1 === currentStep
        const isCompleted = index + 1 < currentStep

        return (
          <button
            key={index}
            onClick={() => onStepClick?.(index + 1)}
            className="w-full text-left"
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-full font-semibold transition-colors ${
                  isCompleted
                    ? "bg-accent text-accent-foreground"
                    : isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {isCompleted ? "✓" : index + 1}
              </div>
              <div className="flex-1">
                <p
                  className={`text-sm font-semibold transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </p>
                {item.description && (
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
                )}
              </div>
            </div>
            {index < items.length - 1 && (
              <div className="ml-5 mt-2 h-6 w-0.5 bg-border" />
            )}
          </button>
        )
      })}
    </div>
  )
}
