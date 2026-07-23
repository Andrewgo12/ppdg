"use client"

import React, { useState, useRef, useEffect } from "react"

// 1. BLUR TEXT ANIMATION (React Bits Style)
interface BlurTextProps {
  text: string
  className?: string
  delay?: number
}

export function BlurText({ text, className = "", delay = 50 }: BlurTextProps) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLHeadingElement | HTMLSpanElement | null>(null)

  useEffect(() => {
    setInView(true)
  }, [])

  const words = text.split(" ")

  return (
    <span ref={ref as any} className={`inline-block ${className}`}>
      {words.map((word, idx) => (
        <span
          key={idx}
          className="inline-block transition-all duration-700 ease-out mr-[0.25em]"
          style={{
            filter: inView ? "blur(0px)" : "blur(12px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0px)" : "translateY(8px)",
            transitionDelay: `${idx * delay}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  )
}

// 2. SPOTLIGHT / GLOW CARD (React Bits Style)
interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  onClick?: () => void
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(59, 130, 246, 0.15)",
  onClick,
}: SpotlightCardProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const cardRef = useRef<HTMLDivElement | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border border-border/80 bg-card p-4 transition-all duration-300 hover:scale-[1.015] active:scale-[0.985] cursor-pointer shadow-xs hover:shadow-lg ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// 3. FADE CONTENT ANIMATION
interface FadeContentProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function FadeContent({ children, className = "", delay = 0 }: FadeContentProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      } ${className}`}
    >
      {children}
    </div>
  )
}
