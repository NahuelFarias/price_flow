"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva("rounded-xl border bg-white text-slate-950 shadow-sm transition-all", {
  variants: {
    variant: {
      default: "border-slate-200 hover:shadow-md",
      success: "border-emerald-200 bg-emerald-50",
      warning: "border-orange-200 bg-orange-50",
      danger: "border-red-200 bg-red-50",
      info: "border-blue-200 bg-blue-50",
    },
    size: {
      sm: "p-4",
      default: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface PfCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  icon?: React.ReactNode
  title?: string
  value?: string | number
  description?: string
  color?: string
}

const PfCard = React.forwardRef<HTMLDivElement, PfCardProps>(
  ({ className, variant, size, icon, title, value, description, color, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(cardVariants({ variant, size, className }))} {...props}>
        {icon || title || value ? (
          <div className="space-y-3">
            {(icon || title) && (
              <div className="flex items-center justify-between">
                {title && <h3 className="text-sm font-medium text-slate-600">{title}</h3>}
                {icon && (
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", color || "bg-slate-100")}>
                    {icon}
                  </div>
                )}
              </div>
            )}
            {value && <div className="text-2xl font-bold text-slate-800">{value}</div>}
            {description && <p className="text-sm text-slate-500">{description}</p>}
          </div>
        ) : null}
        {children}
      </div>
    )
  },
)
PfCard.displayName = "PfCard"

export { PfCard, cardVariants }
