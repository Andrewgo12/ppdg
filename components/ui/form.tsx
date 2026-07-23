"use client"

interface LabelProps {
  required?: boolean
  children: React.ReactNode
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: boolean
}

export function Label({ required, children }: LabelProps) {
  return (
    <label className="block text-sm font-medium text-foreground">
      {children}
      {required && <span className="ml-1 text-destructive">*</span>}
    </label>
  )
}

export function Input({ label, helperText, error, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && <Label required={props.required}>{label}</Label>}
      <input
        {...props}
        className={`w-full rounded-2xl border px-4 py-2.5 text-sm outline-none transition-colors ${
          error
            ? "border-destructive focus:border-destructive focus:ring-destructive/20"
            : "border-input bg-card focus:border-ring focus:ring-2 focus:ring-ring/20"
        }`}
      />
      {helperText && (
        <p className={`text-xs ${error ? "text-destructive" : "text-muted-foreground"}`}>
          {helperText}
        </p>
      )}
    </div>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  error?: boolean
}

export function Textarea({ label, helperText, error, ...props }: TextareaProps) {
  return (
    <div className="space-y-1">
      {label && <Label required={props.required}>{label}</Label>}
      <textarea
        {...props}
        className={`w-full rounded-2xl border px-4 py-2.5 text-sm outline-none transition-colors ${
          error
            ? "border-destructive focus:border-destructive focus:ring-destructive/20"
            : "border-input bg-card focus:border-ring focus:ring-2 focus:ring-ring/20"
        }`}
      />
      {helperText && (
        <p className={`text-xs ${error ? "text-destructive" : "text-muted-foreground"}`}>
          {helperText}
        </p>
      )}
    </div>
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  helperText?: string
  error?: boolean
  options: Array<{ value: string; label: string }>
}

export function Select({ label, helperText, error, options, ...props }: SelectProps) {
  return (
    <div className="space-y-1">
      {label && <Label required={props.required}>{label}</Label>}
      <select
        {...props}
        className={`w-full rounded-2xl border px-4 py-2.5 text-sm outline-none transition-colors ${
          error
            ? "border-destructive focus:border-destructive focus:ring-destructive/20"
            : "border-input bg-card focus:border-ring focus:ring-2 focus:ring-ring/20"
        }`}
      >
        <option value="">Selecciona una opción</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {helperText && (
        <p className={`text-xs ${error ? "text-destructive" : "text-muted-foreground"}`}>
          {helperText}
        </p>
      )}
    </div>
  )
}
