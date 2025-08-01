"use client"

import * as React from "react"
import { PfButton } from "@/components/ui/pf-button"

interface PageHeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
  className?: string
}

export function PageHeader({ 
  title, 
  description, 
  actions, 
  className = "" 
}: PageHeaderProps) {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <div>
        <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
        {description && (
          <p className="text-slate-600 mt-2">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex space-x-3">
          {actions}
        </div>
      )}
    </div>
  )
} 