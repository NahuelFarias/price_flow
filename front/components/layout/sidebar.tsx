"use client"
import { 
  Home, 
  Target, 
  DollarSign, 
  Package, 
  Users, 
  BarChart3, 
  Brain, 
  AlertTriangle, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react"

import { cn } from "@/lib/utils"
import { PfButton } from "@/components/ui/pf-button"

interface SidebarProps {
  activeSection?: string
  collapsed?: boolean
  onToggle?: () => void
  className?: string
}

const sidebarItems = [
  // Sección Principal
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    href: "/",
    priority: "primary"
  },
  
  // Gestión Comercial
  {
    id: "promociones",
    label: "Promociones",
    icon: Target,
    href: "/promociones",
    badge: "3",
    priority: "commercial"
  },
  {
    id: "precios",
    label: "Gestión de Precios",
    icon: DollarSign,
    href: "/precios",
    priority: "commercial"
  },
  
  // Gestión de Datos
  {
    id: "productos",
    label: "Catálogo",
    icon: Package,
    href: "/productos",
    priority: "data"
  },
  {
    id: "clientes",
    label: "Clientes",
    icon: Users,
    href: "/clientes",
    priority: "data"
  },
  
  // Análisis e Inteligencia
  {
    id: "reportes",
    label: "Reportes",
    icon: BarChart3,
    href: "/reportes",
    priority: "analytics"
  },
  {
    id: "recomendaciones",
    label: "Recomendaciones",
    icon: Brain,
    href: "/recomendaciones",
    badge: "2",
    priority: "analytics"
  },
  
  // Sistema
  {
    id: "alertas",
    label: "Alertas",
    icon: AlertTriangle,
    href: "/alertas",
    badge: "5",
    priority: "system"
  },
  {
    id: "configuracion",
    label: "Configuración",
    icon: Settings,
    href: "/configuracion",
    priority: "system"
  },
]

export function Sidebar({ activeSection, collapsed = false, onToggle, className }: SidebarProps) {
  // Agrupar items por prioridad
  const groupedItems = sidebarItems.reduce((acc, item) => {
    if (!acc[item.priority]) {
      acc[item.priority] = []
    }
    acc[item.priority].push(item)
    return acc
  }, {} as Record<string, typeof sidebarItems>)

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
      <nav className="flex-1 p-4 space-y-6">
        {Object.entries(groupedItems).map(([priority, items]) => (
          <div key={priority} className="space-y-2">
            {/* Section Header (solo cuando no está colapsado) */}
            {!collapsed && (
              <div className="px-3 py-2">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {priority === "primary" && "Principal"}
                  {priority === "commercial" && "Comercial"}
                  {priority === "data" && "Datos"}
                  {priority === "analytics" && "Análisis"}
                  {priority === "system" && "Sistema"}
                </h3>
              </div>
            )}
            
            {/* Navigation Items */}
            {items.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group relative",
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
                    <span className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium transform translate-x-1/2 -translate-y-1/2">
                      {item.badge}
                    </span>
                  )}
                </a>
              )
            })}
          </div>
        ))}
      </nav>
    </aside>
  )
}
