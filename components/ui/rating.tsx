"use client"

import { Star } from "lucide-react"
import { useState } from "react"

interface RatingProps {
  value?: number
  onChange?: (rating: number) => void
  readonly?: boolean
  size?: "sm" | "md" | "lg"
}

const SIZES = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
}

export function Rating({ value = 0, onChange, readonly = false, size = "md" }: RatingProps) {
  const [hoverValue, setHoverValue] = useState(0)
  const displayValue = hoverValue || value

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => !readonly && onChange?.(star)}
          onMouseEnter={() => !readonly && setHoverValue(star)}
          onMouseLeave={() => !readonly && setHoverValue(0)}
          disabled={readonly}
          className="transition-colors"
        >
          <Star
            className={`${SIZES[size]} ${
              star <= displayValue
                ? "fill-chart-1 text-chart-1"
                : "text-muted-foreground"
            }`}
          />
        </button>
      ))}
    </div>
  )
}
