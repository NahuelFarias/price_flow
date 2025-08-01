"use client"

import * as React from "react"
import { 
  Plus, 
  TrendingUp, 
  DollarSign, 
  Package, 
  Users, 
  Target,
  AlertTriangle,
  BarChart3
} from "lucide-react"

import { AppLayout } from "@/components/layout/app-layout"
import { PageHeader } from "@/components/ui/page-header"
import { MetricsGrid } from "@/components/ui/metrics-grid"
import { PfButton } from "@/components/ui/pf-button"
import { PfTable } from "@/components/ui/pf-table"
import { PfCard } from "@/components/ui/pf-card"
import { SalesChart, MarginsChart, PromotionsChart, CategoryDistributionChart } from "@/components/ui/pf-chart"

// Datos de ejemplo para la tabla
const sampleData = [
  {
    id: 1,
    nombre: "Coca Cola 2L",
    sku: "CC-2L-001",
    categoria: "Bebidas",
    precio: 450,
    stock: 150,
    estado: "activo"
  },
  {
    id: 2,
    nombre: "Pan Lactal",
    sku: "PL-500G-002",
    categoria: "Alimentos",
    precio: 280,
    stock: 89,
    estado: "activo"
  },
  {
    id: 3,
    nombre: "Detergente Ala",
    sku: "DA-1L-003",
    categoria: "Limpieza",
    precio: 320,
    stock: 45,
    estado: "bajo_stock"
  },
  {
    id: 4,
    nombre: "Aceite Natura",
    sku: "AN-1L-004",
    categoria: "Alimentos",
    precio: 890,
    stock: 23,
    estado: "bajo_stock"
  },
  {
    id: 5,
    nombre: "Leche La Serenísima",
    sku: "LS-1L-005",
    categoria: "Lácteos",
    precio: 180,
    stock: 0,
    estado: "sin_stock"
  }
]

const columns = [
  { key: "nombre" as const, label: "Producto", sortable: true },
  { key: "sku" as const, label: "SKU", sortable: true },
  { key: "categoria" as const, label: "Categoría", sortable: true },
  { key: "precio" as const, label: "Precio", sortable: true },
  { key: "stock" as const, label: "Stock", sortable: true },
  { key: "estado" as const, label: "Estado", sortable: true },
]

// Datos para métricas del dashboard
const metricasDashboard = [
  {
    titulo: "Ventas del mes",
    valor: "$2.4M",
    descripcion: "+12% vs mes anterior",
    color: "bg-blue-100",
    icono: TrendingUp,
    colorIcono: "text-blue-600"
  },
  {
    titulo: "Margen promedio",
    valor: "23.5%",
    descripcion: "+2.1% vs mes anterior",
    color: "bg-green-100",
    icono: DollarSign,
    colorIcono: "text-green-600"
  },
  {
    titulo: "Productos activos",
    valor: "247",
    descripcion: "+8 este mes",
    color: "bg-purple-100",
    icono: Package,
    colorIcono: "text-purple-600"
  },
  {
    titulo: "Clientes activos",
    valor: "89",
    descripcion: "+3 este mes",
    color: "bg-orange-100",
    icono: Users,
    colorIcono: "text-orange-600"
  },
  {
    titulo: "Promociones activas",
    valor: "12",
    descripcion: "3 próximas a vencer",
    color: "bg-pink-100",
    icono: Target,
    colorIcono: "text-pink-600"
  }
]

// Datos para alertas importantes
const alertasData = [
  {
    id: 1,
    mensaje: "Leche La Serenísima sin stock - Requiere reposición urgente",
    prioridad: "alta",
    fecha: "2024-03-23"
  },
  {
    id: 2,
    mensaje: "Promoción Coca Cola vence en 3 días - Revisar renovación",
    prioridad: "media",
    fecha: "2024-03-23"
  },
  {
    id: 3,
    mensaje: "5 productos con stock bajo - Considerar reabastecimiento",
    prioridad: "media",
    fecha: "2024-03-23"
  }
]

// Datos para gráficos
const salesData = [
  { name: "Sem 1", value: 120 },
  { name: "Sem 2", value: 135 },
  { name: "Sem 3", value: 142 },
  { name: "Sem 4", value: 158 },
  { name: "Sem 5", value: 165 },
  { name: "Sem 6", value: 172 },
]

const marginsData = [
  { name: "Sem 1", value: 18 },
  { name: "Sem 2", value: 19 },
  { name: "Sem 3", value: 21 },
  { name: "Sem 4", value: 22 },
  { name: "Sem 5", value: 23 },
  { name: "Sem 6", value: 24 },
]

const promotionsData = [
  { name: "Sem 1", value: 85 },
  { name: "Sem 2", value: 88 },
  { name: "Sem 3", value: 92 },
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
  const handleCrearPromocion = () => {
    window.location.href = "/promociones/crear"
  }

  const headerActions = (
    <>
      <PfButton variant="outline" onClick={() => window.location.href = "/productos"}>
        Ver Productos
      </PfButton>
      <PfButton onClick={handleCrearPromocion} className="flex items-center space-x-2">
        <Plus className="h-4 w-4" />
        <span>Crear Promoción</span>
      </PfButton>
    </>
  )

  return (
    <AppLayout activeSection="dashboard">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <PageHeader
          title="Dashboard"
          description="Vista general de tu negocio mayorista"
          actions={headerActions}
        />

        {/* Métricas */}
        <MetricsGrid metrics={metricasDashboard} />

        {/* Gráficos de Análisis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <SalesChart data={salesData} height={300} />
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <MarginsChart data={marginsData} height={300} />
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <PromotionsChart data={promotionsData} height={300} />
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <CategoryDistributionChart data={categoryData} height={300} />
          </div>
        </div>

        {/* Productos Recientes */}
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">Productos Recientes</h2>
            <p className="text-slate-600 mt-1">Últimos productos agregados al catálogo</p>
          </div>
          
          <PfTable
            data={sampleData}
            columns={columns}
            searchable={false}
            pagination
            pageSize={5}
            onRowClick={(row) => {
              // Aquí iría la lógica para ver detalles del producto
              console.log("Ver detalles:", row)
            }}
          />
        </div>

        {/* Alertas Importantes */}
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span>Alertas Importantes</span>
            </h2>
            <p className="text-slate-600 mt-1">Acciones que requieren tu atención</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {alertasData.map((alerta) => (
                <div
                  key={alerta.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    alerta.prioridad === "alta"
                      ? "bg-red-50 border-red-400"
                      : "bg-yellow-50 border-yellow-400"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className={`font-medium ${
                        alerta.prioridad === "alta" ? "text-red-800" : "text-yellow-800"
                      }`}>
                        {alerta.mensaje}
                      </p>
                      <p className="text-sm text-slate-600 mt-1">{alerta.fecha}</p>
                    </div>
                    <PfButton
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Aquí iría la lógica para manejar la alerta
                        console.log("Manejar alerta:", alerta.id)
                      }}
                    >
                      Ver
                    </PfButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
