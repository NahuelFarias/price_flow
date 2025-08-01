"use client"

import * as React from "react"
import { Target, DollarSign, TrendingUp, Users } from "lucide-react"

import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { PfCard } from "@/components/ui/pf-card"
import { PfButton } from "@/components/ui/pf-button"
import { PfTable } from "@/components/ui/pf-table"
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  useToast,
} from "@/components/ui/pf-toast"

// Datos de ejemplo para la tabla
const sampleData = [
  { id: 1, producto: "Coca Cola 2L", precio: "$450", margen: "23%", stock: 150 },
  { id: 2, producto: "Pan Lactal", precio: "$280", margen: "18%", stock: 89 },
  { id: 3, producto: "Detergente Ala", precio: "$320", margen: "25%", stock: 45 },
  { id: 4, producto: "Aceite Natura", precio: "$890", margen: "15%", stock: 23 },
]

const columns = [
  { key: "producto" as const, label: "Producto", sortable: true },
  { key: "precio" as const, label: "Precio", sortable: true },
  { key: "margen" as const, label: "Margen", sortable: true },
  { key: "stock" as const, label: "Stock", sortable: true },
]

export default function PriceflowDemo() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("dashboard")
  const { toast, toasts, dismiss } = useToast()

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

  const showSuccessToast = () => {
    toast({
      variant: "success",
      title: "¡Promoción creada!",
      description: "La promoción se activó correctamente.",
    })
  }

  const showWarningToast = () => {
    toast({
      variant: "warning",
      title: "Stock bajo",
      description: "Algunos productos requieren reposición.",
    })
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Navbar */}
        <Navbar
          user={mockUser}
          activeSection={activeSection}
          onLogout={handleLogout}
          onAccountClick={handleAccountClick}
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar
            activeSection={activeSection}
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden md:flex"
          />

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Welcome Section */}
              <div>
                <h1 className="text-2xl font-bold text-slate-800 mb-2">¡Bienvenida, {mockUser.name.split(" ")[0]}!</h1>
                <p className="text-slate-600">Aquí tienes un resumen de tu plataforma Priceflow</p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <PfCard
                  icon={<Target className="h-5 w-5 text-blue-600" />}
                  title="Promociones activas"
                  value="12"
                  description="+3 esta semana"
                  color="bg-blue-100"
                />
                <PfCard
                  icon={<DollarSign className="h-5 w-5 text-emerald-600" />}
                  title="Margen promedio"
                  value="23.4%"
                  description="+2.1% vs mes anterior"
                  color="bg-emerald-100"
                />
                <PfCard
                  icon={<DollarSign className="h-5 w-5 text-emerald-600" />}
                  title="Ventas totales"
                  value="$1,234,567"
                  description="+5.6% vs mes anterior"
                  color="bg-emerald-100"
                />
                <PfCard
                  icon={<TrendingUp className="h-5 w-5 text-orange-600" />}
                  title="Productos con margen bajo"
                  value="8"
                  description="Requieren atención"
                  color="bg-orange-100"
                />
                <PfCard
                  icon={<Users className="h-5 w-5 text-purple-600" />}
                  title="Clientes activos"
                  value="247"
                  description="+12% este mes"
                  color="bg-purple-100"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <PfButton onClick={showSuccessToast}>Crear promoción</PfButton>
                <PfButton variant="outline" onClick={showWarningToast}>
                  Ver alertas
                </PfButton>
                <PfButton variant="success">Generar reporte</PfButton>
              </div>

              {/* Data Table */}
              <div>
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Productos Recientes</h2>
                <PfTable
                  data={sampleData}
                  columns={columns}
                  searchable
                  pagination
                  pageSize={5}
                  onRowClick={(row) => {
                    toast({
                      variant: "info",
                      title: "Producto seleccionado",
                      description: `Has seleccionado: ${row.producto}`,
                    })
                  }}
                />
              </div>
            </div>
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
