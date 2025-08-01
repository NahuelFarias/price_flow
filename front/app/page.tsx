"use client"

import * as React from "react"
import { Target, DollarSign, TrendingUp, Users } from "lucide-react"

import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { PfCard } from "@/components/ui/pf-card"
import { PfButton } from "@/components/ui/pf-button"
import { PfTable } from "@/components/ui/pf-table"
import { SalesChart, MarginsChart, PromotionsChart, CategoryDistributionChart } from "@/components/ui/pf-chart"
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
  { id: 1, producto: "Coca Cola 2L", precio: "$450", margen: "23%", stock: 150, categoria: "Bebidas", estado: "activo" },
  { id: 2, producto: "Pan Lactal", precio: "$280", margen: "18%", stock: 89, categoria: "Alimentos", estado: "activo" },
  { id: 3, producto: "Detergente Ala", precio: "$320", margen: "25%", stock: 45, categoria: "Limpieza", estado: "activo" },
  { id: 4, producto: "Aceite Natura", precio: "$890", margen: "15%", stock: 23, categoria: "Alimentos", estado: "bajo_stock" },
  { id: 5, producto: "Leche La Serenísima", precio: "$180", margen: "12%", stock: 0, categoria: "Lácteos", estado: "sin_stock" },
  { id: 6, producto: "Yogur Danone", precio: "$220", margen: "20%", stock: 67, categoria: "Lácteos", estado: "activo" },
  { id: 7, producto: "Arroz Gallo", precio: "$150", margen: "16%", stock: 120, categoria: "Alimentos", estado: "activo" },
  { id: 8, producto: "Aceite de Oliva", precio: "$1,200", margen: "30%", stock: 15, categoria: "Alimentos", estado: "bajo_stock" },
]

const columns = [
  { key: "producto" as const, label: "Producto", sortable: true },
  { key: "precio" as const, label: "Precio", sortable: true },
  { key: "margen" as const, label: "Margen", sortable: true },
  { key: "stock" as const, label: "Stock", sortable: true },
  { key: "categoria" as const, label: "Categoría", sortable: true },
]

// Datos de alertas importantes
const alertasData = [
  { id: 1, tipo: "stock", mensaje: "Leche La Serenísima sin stock", prioridad: "alta", accion: "Reposición urgente" },
  { id: 2, tipo: "margen", mensaje: "Aceite Natura con margen bajo (15%)", prioridad: "media", accion: "Revisar precio" },
  { id: 3, tipo: "promocion", mensaje: "Promoción Coca Cola expira en 2 días", prioridad: "media", accion: "Renovar o finalizar" },
  { id: 4, tipo: "cliente", mensaje: "Cliente Premium solicita descuento especial", prioridad: "alta", accion: "Revisar solicitud" },
]

// Datos para gráficos
const salesData = [
  { name: "Ene", value: 1200000 },
  { name: "Feb", value: 1350000 },
  { name: "Mar", value: 1280000 },
  { name: "Abr", value: 1420000 },
  { name: "May", value: 1380000 },
  { name: "Jun", value: 1560000 },
]

const marginsData = [
  { name: "Alimentos", value: 18 },
  { name: "Bebidas", value: 25 },
  { name: "Limpieza", value: 22 },
  { name: "Lácteos", value: 16 },
  { name: "Otros", value: 20 },
]

const promotionsData = [
  { name: "Sem 1", value: 85 },
  { name: "Sem 2", value: 92 },
  { name: "Sem 3", value: 78 },
  { name: "Sem 4", value: 88 },
  { name: "Sem 5", value: 95 },
  { name: "Sem 6", value: 91 },
]

const categoryData = [
  { name: "Alimentos", value: 45 },
  { name: "Bebidas", value: 25 },
  { name: "Limpieza", value: 20 },
  { name: "Lácteos", value: 10 },
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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

              {/* Segunda fila de métricas específicas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <PfCard
                  icon={<Target className="h-5 w-5 text-green-600" />}
                  title="Promociones próximas"
                  value="5"
                  description="Se activan en 7 días"
                  color="bg-green-100"
                />
                <PfCard
                  icon={<TrendingUp className="h-5 w-5 text-red-600" />}
                  title="Productos sin stock"
                  value="3"
                  description="Reposición urgente"
                  color="bg-red-100"
                />
                <PfCard
                  icon={<DollarSign className="h-5 w-5 text-yellow-600" />}
                  title="Margen por categoría"
                  value="Alimentos: 18%"
                  description="Bebidas: 25% | Limpieza: 22%"
                  color="bg-yellow-100"
                />
                <PfCard
                  icon={<Users className="h-5 w-5 text-indigo-600" />}
                  title="Clientes premium"
                  value="45"
                  description="+8% este mes"
                  color="bg-indigo-100"
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

              {/* Alertas Importantes */}
              <div>
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Alertas Importantes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {alertasData.map((alerta) => (
                    <div
                      key={alerta.id}
                      className={`p-4 rounded-lg border-l-4 ${
                        alerta.prioridad === "alta"
                          ? "border-red-500 bg-red-50"
                          : "border-yellow-500 bg-yellow-50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-800">{alerta.mensaje}</p>
                          <p className="text-xs text-slate-600 mt-1">{alerta.accion}</p>
                        </div>
                        <PfButton
                          variant="outline"
                          size="sm"
                          className="ml-2"
                          onClick={() => {
                            toast({
                              variant: "info",
                              title: "Acción tomada",
                              description: `Procesando: ${alerta.accion}`,
                            })
                          }}
                        >
                          Ver
                        </PfButton>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gráficos de Análisis */}
              <div>
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Análisis de Datos</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <SalesChart data={salesData} />
                  <MarginsChart data={marginsData} />
                  <PromotionsChart data={promotionsData} />
                  <CategoryDistributionChart data={categoryData} />
                </div>
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
