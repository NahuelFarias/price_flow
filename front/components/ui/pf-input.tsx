"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Eye, EyeOff, AlertCircle } from "lucide-react"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex w-full rounded-lg border bg-white px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-slate-200 focus-visible:ring-slate-950",
        error: "border-red-300 focus-visible:ring-red-500",
        success: "border-emerald-300 focus-visible:ring-emerald-500",
      },
      size: {
        sm: "h-8 px-2 text-xs",
        default: "h-10",
        lg: "h-12 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface PfInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
}

const PfInput = React.forwardRef<HTMLInputElement, PfInputProps>(
  ({ className, variant, size, type, label, error, helperText, icon, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const isPassword = type === "password"
    const inputType = isPassword && showPassword ? "text" : type

    const inputVariant = error ? "error" : variant

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-slate-700">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">{icon}</div>}
          <input
            type={inputType}
            className={cn(
              inputVariants({ variant: inputVariant, size, className }),
              icon && "pl-10",
              isPassword && "pr-10",
            )}
            ref={ref}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
        {error && (
          <div className="flex items-center text-sm text-red-600">
            <AlertCircle className="h-4 w-4 mr-1" />
            {error}
          </div>
        )}
        {helperText && !error && <p className="text-sm text-slate-500">{helperText}</p>}
      </div>
    )
  },
)
PfInput.displayName = "PfInput"

export { PfInput, inputVariants }
