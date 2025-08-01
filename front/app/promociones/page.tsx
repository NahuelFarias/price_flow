"use client"

import * as React from "react"
import { 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Target,
  Calendar,
  Users,
  TrendingUp,
  AlertTriangle
} from "lucide-react"

import { AppLayout } from "@/components/layout/app-layout"
import { PageHeader } from "@/components/ui/page-header"
import { MetricsGrid } from "@/components/ui/metrics-grid"
import { FiltersSection } from "@/components/ui/filters-section"
import { PfButton } from "@/components/ui/pf-button"
import { PfTable } from "@/components/ui/pf-table"
import { PfCard } from "@/components/ui/pf-card"
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  useToast,
} from "@/components/ui/pf-toast"

// Datos de ejemplo para promociones
const promocionesData = [
  {
    id: 1,
    nombre: "Descuento Coca Cola 2L",
    tipo: "Descuento por volumen",
    descuento: "15%",
    estado: "activa",
    fechaInicio: "2024-01-15",
    fechaFin: "2024-02-15",
    productos: ["Coca Cola 2L"],
    clientes: "Todos",
    ventas: 1250,
    margen: "18%",
    rendimiento: "excelente"
  },
  {
    id: 2,
    nombre: "Combo Limpieza",
    tipo: "Combo",
    descuento: "20%",
    estado: "activa",
    fechaInicio: "2024-01-20",
    fechaFin: "2024-03-20",
    productos: ["Detergente Ala", "Suavizante Comfort"],
    clientes: "Premium",
    ventas: 890,
    margen: "22%",
    rendimiento: "bueno"
  },
  {
    id: 3,
    nombre: "Promoción Lácteos",
    tipo: "Descuento directo",
    descuento: "10%",
    estado: "próxima",
    fechaInicio: "2024-02-01",
    fechaFin: "2024-02-28",
    productos: ["Leche La Serenísima", "Yogur Danone"],
    clientes: "Todos",
    ventas: 0,
    margen: "15%",
    rendimiento: "pendiente"
  },
  {
    id: 4,
    nombre: "Descuento Aceite",
    tipo: "Descuento por volumen",
    descuento: "25%",
    estado: "expirada",
    fechaInicio: "2023-12-01",
    fechaFin: "2023-12-31",
    productos: ["Aceite Natura", "Aceite de Oliva"],
    clientes: "Grandes compradores",
    ventas: 2100,
    margen: "12%",
    rendimiento: "regular"
  },
  {
    id: 5,
    nombre: "Promoción Pan",
    tipo: "Descuento directo",
    descuento: "8%",
    estado: "activa",
    fechaInicio: "2024-01-10",
    fechaFin: "2024-01-31",
    productos: ["Pan Lactal"],
    clientes: "Todos",
    ventas: 567,
    margen: "16%",
    rendimiento: "bueno"
  },
  {
    id: 6,
    nombre: "Combo Bebidas",
    tipo: "Combo",
    descuento: "12%",
    estado: "activa",
    fechaInicio: "2024-01-25",
    fechaFin: "2024-03-25",
    productos: ["Coca Cola 2L", "Pepsi 2L", "Sprite 2L"],
    clientes: "Premium",
    ventas: 789,
    margen: "20%",
    rendimiento: "excelente"
  }
]

const columns = [
  { key: "nombre" as const, label: "Promoción", sortable: true },
  { key: "tipo" as const, label: "Tipo", sortable: true },
  { key: "descuento" as const, label: "Descuento", sortable: true },
  { key: "estado" as const, label: "Estado", sortable: true },
  { key: "fechaInicio" as const, label: "Inicio", sortable: true },
  { key: "fechaFin" as const, label: "Fin", sortable: true },
  { key: "ventas" as const, label: "Ventas", sortable: true },
  { key: "rendimiento" as const, label: "Rendimiento", sortable: true },
]

// Datos para métricas de promociones
const metricasPromociones = [
  {
    titulo: "Promociones activas",
    valor: "12",
    descripcion: "3 próximas a vencer",
    color: "bg-green-100",
    icono: Target,
    colorIcono: "text-green-600"
  },
  {
    titulo: "Ventas por promociones",
    valor: "$45.2K",
    descripcion: "+18% vs mes anterior",
    color: "bg-blue-100",
    icono: TrendingUp,
    colorIcono: "text-blue-600"
  },
  {
    titulo: "Margen promedio",
    valor: "19.2%",
    descripcion: "+2.5% vs mes anterior",
    color: "bg-purple-100",
    icono: AlertTriangle,
    colorIcono: "text-purple-600"
  },
  {
    titulo: "Clientes alcanzados",
    valor: "89",
    descripcion: "+12 este mes",
    color: "bg-orange-100",
    icono: Users,
    colorIcono: "text-orange-600"
  }
]

export default function PromocionesPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [filterEstado, setFilterEstado] = React.useState("todos")
  const [filterTipo, setFilterTipo] = React.useState("todos")
  const { toast, toasts, dismiss } = useToast()

  // Filtrar promociones
  const filteredPromociones = promocionesData.filter(promocion => {
    const matchesSearch = promocion.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promocion.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEstado = filterEstado === "todos" || promocion.estado === filterEstado
    const matchesTipo = filterTipo === "todos" || promocion.tipo === filterTipo
    
    return matchesSearch && matchesEstado && matchesTipo
  })

  const handleCrearPromocion = () => {
    window.location.href = "/promociones/crear"
  }

  const handleEditarPromocion = (promocion: any) => {
    toast({
      variant: "info",
      title: "Editar promoción",
      description: `Editando: ${promocion.nombre}`,
    })
  }

  const handleVerDetalles = (promocion: any) => {
    toast({
      variant: "info",
      title: "Ver detalles",
      description: `Detalles de: ${promocion.nombre}`,
    })
  }

  // Configuración de filtros para FiltersSection
  const filters = {
    estado: [
      { value: "activa", label: "Activa" },
      { value: "próxima", label: "Próxima" },
      { value: "expirada", label: "Expirada" }
    ],
    tipo: [
      { value: "Descuento por volumen", label: "Descuento por volumen" },
      { value: "Combo", label: "Combo" },
      { value: "Descuento directo", label: "Descuento directo" }
    ]
  }

  const filterValues = {
    estado: filterEstado,
    tipo: filterTipo
  }

  const handleFilterChange = (filterName: string, value: string) => {
    switch (filterName) {
      case "estado":
        setFilterEstado(value)
        break
      case "tipo":
        setFilterTipo(value)
        break
    }
  }

  const headerActions = (
    <PfButton onClick={handleCrearPromocion} className="flex items-center space-x-2">
      <Plus className="h-4 w-4" />
      <span>Crear Promoción</span>
    </PfButton>
  )

  return (
    <AppLayout activeSection="promociones">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <PageHeader
          title="Gestión de Promociones"
          description="Administra tus promociones y descuentos"
          actions={headerActions}
        />

        {/* Métricas */}
        <MetricsGrid metrics={metricasPromociones} />

        {/* Filtros y Búsqueda */}
        <FiltersSection
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Buscar promociones por nombre o tipo..."
          filters={filters}
          filterValues={filterValues}
          onFilterChange={handleFilterChange}
        />

        {/* Tabla de Promociones */}
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">Promociones</h2>
            <p className="text-slate-600 mt-1">Gestiona todas tus promociones y descuentos</p>
          </div>
          
          <PfTable
            data={filteredPromociones}
            columns={columns}
            searchable={false}
            pagination
            pageSize={10}
            onRowClick={(row) => handleVerDetalles(row)}
          />
        </div>
      </div>
    </AppLayout>
  )
} 