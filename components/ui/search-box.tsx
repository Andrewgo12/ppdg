"use client"

import { Search, X } from "lucide-react"
import { useState } from "react"

interface SearchProps {
  placeholder?: string
  onSearch?: (query: string) => void
  onClear?: () => void
}

export function SearchBox({ placeholder = "Buscar...", onSearch, onClear }: SearchProps) {
  const [value, setValue] = useState("")

  const handleClear = () => {
    setValue("")
    onClear?.()
  }

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          onSearch?.(e.target.value)
        }}
        className="w-full rounded-2xl border border-input bg-card pl-10 pr-10 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
