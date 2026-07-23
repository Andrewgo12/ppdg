"use client"

import { Copy, Download, MoreVertical } from "lucide-react"

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
}

export function CodeBlock({ code, language = "javascript", showLineNumbers = false }: CodeBlockProps) {
  const lines = code.split("\n")

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between bg-muted px-4 py-3">
        <span className="text-xs font-medium text-muted-foreground">{language}</span>
        <div className="flex gap-2">
          <button className="rounded p-1 text-muted-foreground hover:bg-card hover:text-foreground transition-colors">
            <Copy className="size-4" />
          </button>
          <button className="rounded p-1 text-muted-foreground hover:bg-card hover:text-foreground transition-colors">
            <Download className="size-4" />
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto p-4 text-xs">
        <code className="font-mono">
          {lines.map((line, index) => (
            <div key={index} className="flex">
              {showLineNumbers && (
                <span className="mr-4 inline-block w-8 text-right text-muted-foreground select-none">
                  {index + 1}
                </span>
              )}
              <span>{line}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}
