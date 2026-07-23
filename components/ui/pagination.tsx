"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="size-4" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
            page === currentPage
              ? "bg-primary text-primary-foreground"
              : "border border-border text-foreground hover:border-primary"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  )
}
