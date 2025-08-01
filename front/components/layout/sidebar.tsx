"use client"
import { Target, DollarSign, BarChart3, Brain, Settings, ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { PfButton } from "@/components/ui/pf-button"

interface SidebarProps {
  activeSection?: string
  collapsed?: boolean
  onToggle?: () => void
  className?: string
}

const sidebarItems = [
  {
    id: "promociones",
    label: "Promociones",
    icon: Target,
    href: "/promociones",
    badge: "3",
  },
  {
    id: "precios",
    label: "Precios",
    icon: DollarSign,
    href: "/precios",
  },
  {
    id: "reportes",
    label: "Reportes",
    icon: BarChart3,
    href: "/reportes",
  },
  {
    id: "recomendaciones",
    label: "Recomendaciones",
    icon: Brain,
    href: "/recomendaciones",
    badge: "2",
  },
  {
    id: "configuracion",
    label: "Configuración",
    icon: Settings,
    href: "/configuracion",
  },
]

export function Sidebar({ activeSection, collapsed = false, onToggle, className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "bg-white border-r border-slate-200 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Toggle Button */}
      <div className="p-4 border-b border-slate-200">
        <PfButton variant="ghost" size="icon" onClick={onToggle} className="ml-auto">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </PfButton>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
                isActive ? "bg-slate-100 text-slate-800" : "text-slate-600 hover:text-slate-800 hover:bg-slate-50",
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="bg-emerald-100 text-emerald-600 text-xs px-2 py-1 rounded-full">{item.badge}</span>
                  )}
                </>
              )}
              {collapsed && item.badge && (
                <span className="absolute left-8 top-1 bg-emerald-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </a>
          )
        })}
      </nav>
    </aside>
  )
}
