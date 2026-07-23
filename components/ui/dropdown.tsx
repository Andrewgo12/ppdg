"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

interface DropdownOption {
  id: string
  label: string
  icon?: React.ReactNode
  action?: () => void
}

interface DropdownProps {
  label: string
  options: DropdownOption[]
  onSelect?: (option: DropdownOption) => void
}

export function Dropdown({ label, options, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
      >
        {label}
        <ChevronDown className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-2xl border border-border bg-card shadow-lg">
          <ul className="divide-y divide-border py-1">
            {options.map((option) => (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect?.(option)
                    option.action?.()
                    setIsOpen(false)
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-muted"
                >
                  {option.icon}
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
