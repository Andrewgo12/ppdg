"use client"

import React, { useRef, useState, useEffect } from "react"
import { Eraser, Check, PenTool } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SignaturePadProps {
  onSaveSignature: (dataUrl: string) => void
  label?: string
}

export function SignaturePad({ onSaveSignature, label = "Firma Digital en Pantalla (Mouse / Táctil)" }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.strokeStyle = "#0F2043" // Azul institucional
    ctx.lineWidth = 2.5
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    setHasDrawn(true)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawn(false)
  }

  const saveSignature = () => {
    const canvas = canvasRef.current
    if (!canvas || !hasDrawn) return
    const dataUrl = canvas.toDataURL("image/png")
    onSaveSignature(dataUrl)
  }

  return (
    <div className="space-y-2 rounded-2xl border border-border bg-card p-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
          <PenTool className="size-3.5 text-primary" />
          {label}
        </label>
        {hasDrawn && (
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            Firma Detectada
          </span>
        )}
      </div>

      <div className="relative rounded-xl border border-dashed border-input bg-background/80 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={400}
          height={120}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-[120px] cursor-crosshair touch-none"
        />
        {!hasDrawn && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-muted-foreground/40 text-xs">
            Dibuje su firma aquí...
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-2 pt-1">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={clearCanvas}
          className="h-7 text-xs rounded-full gap-1"
        >
          <Eraser className="size-3" />
          Limpiar
        </Button>
        <Button
          type="button"
          size="sm"
          disabled={!hasDrawn}
          onClick={saveSignature}
          className="h-7 text-xs rounded-full gap-1 bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Check className="size-3" />
          Confirmar Firma
        </Button>
      </div>
    </div>
  )
}
