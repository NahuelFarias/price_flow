"use client"

import * as React from "react"
import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  useToast,
} from "@/components/ui/pf-toast"

interface AppLayoutProps {
  children: React.ReactNode
  activeSection: string
  showSidebar?: boolean
  className?: string
  showNavbarSimple?: boolean // Para login y páginas públicas
  noPadding?: boolean // Para landing y páginas que van de borde a borde
}

// Hook personalizado para manejar el usuario y sus acciones
export function useAppUser() {
  const { toast } = useToast()

  const mockUser = {
    name: "María González",
    email: "maria@distribuidora.com",
    avatar: undefined,
  }

  const handleLogout = () => {
    toast({
      variant: "info",
      title: "Cerrando sesión",
      description: "Hasta pronto, María!",
    })
  }

  const handleAccountClick = () => {
    window.location.href = "/account"
  }

  return {
    user: mockUser,
    handleLogout,
    handleAccountClick,
  }
}

export function AppLayout({ 
  children, 
  activeSection, 
  showSidebar = true,
  className = "",
  showNavbarSimple = false,
  noPadding = false
}: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const { user, handleLogout, handleAccountClick } = useAppUser()
  const { toasts, dismiss } = useToast()

  return (
    <ToastProvider>
      <div className={`min-h-screen bg-slate-50 flex flex-col ${className}`}>
        {/* Navbar */}
        <Navbar
          user={showNavbarSimple ? undefined : user}
          activeSection={activeSection}
          onLogout={handleLogout}
          onAccountClick={handleAccountClick}
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          isSimple={showNavbarSimple}
        />

        <div className="flex flex-1">
          {/* Sidebar */}
          {showSidebar && (
            <Sidebar
              activeSection={activeSection}
              collapsed={sidebarCollapsed}
              onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden md:flex"
            />
          )}

          {/* Main Content */}
          <main className={`flex-1 ${noPadding ? '' : 'p-6'}`}>
            {children}
          </main>
        </div>

        {/* Toast Container */}
        <ToastViewport />
        {toasts.map((toastData) => (
          <Toast key={toastData.id} variant={toastData.variant}>
            <div className="flex items-start space-x-3">
              {toastData.icon}
              <div className="flex-1">
                {toastData.title && <ToastTitle>{toastData.title}</ToastTitle>}
                {toastData.description && <ToastDescription>{toastData.description}</ToastDescription>}
              </div>
            </div>
            <ToastClose onClick={() => dismiss(toastData.id!)} />
          </Toast>
        ))}
      </div>
    </ToastProvider>
  )
} 