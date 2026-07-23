"use client"

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        {...props}
        className="size-5 cursor-pointer rounded border border-input accent-primary transition-colors"
      />
      {label && <span className="text-sm text-foreground">{label}</span>}
    </label>
  )
}

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Radio({ label, ...props }: RadioProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <input
        type="radio"
        {...props}
        className="size-5 cursor-pointer accent-primary transition-colors"
      />
      {label && <span className="text-sm text-foreground">{label}</span>}
    </label>
  )
}
