"use client"
import { Bell, ChevronDown, User, TrendingUp, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { PfButton } from "@/components/ui/pf-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavbarProps {
  user?: {
    name: string
    email: string
    avatar?: string
  }
  activeSection?: string
  onMenuClick?: () => void
  onLogout?: () => void
  onAccountClick?: () => void
}

const navigationItems = [
  { id: "promociones", label: "Promociones", href: "/promociones" },
  { id: "precios", label: "Precios", href: "/precios" },
  { id: "reportes", label: "Reportes", href: "/reportes" },
  { id: "recomendaciones", label: "Recomendaciones", href: "/recomendaciones" },
  { id: "configuracion", label: "Configuración", href: "/configuracion" },
]

export function Navbar({ user, activeSection, onMenuClick, onLogout, onAccountClick }: NavbarProps) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <PfButton variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
              <Menu className="h-5 w-5" />
            </PfButton>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">Priceflow</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  activeSection === item.id
                    ? "bg-slate-100 text-slate-800"
                    : "text-slate-600 hover:text-slate-800 hover:bg-slate-50",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <PfButton variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"></span>
            </PfButton>

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <PfButton variant="ghost" className="flex items-center space-x-2 px-3">
                    <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                      {user.avatar ? (
                        <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-8 h-8 rounded-full" />
                      ) : (
                        <User className="w-4 h-4 text-slate-600" />
                      )}
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="text-sm font-medium text-slate-800">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </PfButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={onAccountClick}>
                    <User className="w-4 h-4 mr-2" />
                    Mi cuenta
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={onLogout}>
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
