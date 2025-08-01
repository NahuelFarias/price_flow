"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-slate-800 text-white hover:bg-slate-700 shadow-sm",
        secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200",
        success: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm",
        warning: "bg-orange-500 text-white hover:bg-orange-600 shadow-sm",
        danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
        ghost: "hover:bg-slate-100 text-slate-600 hover:text-slate-800",
        outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-800",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-4 py-2",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
)

export interface PfButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  icon?: React.ReactNode
}

const PfButton = React.forwardRef<HTMLButtonElement, PfButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, icon, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : icon ? (
          <span className="mr-2">{icon}</span>
        ) : null}
        {children}
      </Comp>
    )
  },
)
PfButton.displayName = "PfButton"

export { PfButton, buttonVariants }
