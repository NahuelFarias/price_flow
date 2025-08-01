"use client"

import * as React from "react"
import { 
  Plus, 
  Search, 
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

import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
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
  }
]

const columns = [
  { key: "nombre" as const, label: "Promoción", sortable: true },
  { key: "tipo" as const, label: "Tipo", sortable: true },
  { key: "descuento" as const, label: "Descuento", sortable: true },
  { key: "estado" as const, label: "Estado", sortable: true },
  { key: "fechaFin" as const, label: "Vence", sortable: true },
  { key: "ventas" as const, label: "Ventas", sortable: true },
  { key: "rendimiento" as const, label: "Rendimiento", sortable: true },
]

// Datos para métricas de promociones
const metricasPromociones = [
  {
    titulo: "Promociones activas",
    valor: "12",
    descripcion: "+3 esta semana",
    color: "bg-blue-100",
    icono: Target,
    colorIcono: "text-blue-600"
  },
  {
    titulo: "Promociones próximas",
    valor: "5",
    descripcion: "Se activan en 7 días",
    color: "bg-green-100",
    icono: Calendar,
    colorIcono: "text-green-600"
  },
  {
    titulo: "Promociones expiradas",
    valor: "8",
    descripcion: "Este mes",
    color: "bg-orange-100",
    icono: AlertTriangle,
    colorIcono: "text-orange-600"
  },
  {
    titulo: "Clientes alcanzados",
    valor: "247",
    descripcion: "+12% este mes",
    color: "bg-purple-100",
    icono: Users,
    colorIcono: "text-purple-600"
  }
]

export default function PromocionesPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [filterEstado, setFilterEstado] = React.useState("todos")
  const [filterTipo, setFilterTipo] = React.useState("todos")
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("promociones")
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
              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-slate-800">Gestión de Promociones</h1>
                  <p className="text-slate-600 mt-2">Administra y crea promociones para impulsar tus ventas</p>
                </div>
                <PfButton onClick={handleCrearPromocion} className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Crear Promoción</span>
                </PfButton>
              </div>

              {/* Métricas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metricasPromociones.map((metrica, index) => {
                  const Icon = metrica.icono
                  return (
                    <PfCard
                      key={index}
                      icon={<Icon className={`h-5 w-5 ${metrica.colorIcono}`} />}
                      title={metrica.titulo}
                      value={metrica.valor}
                      description={metrica.descripcion}
                      color={metrica.color}
                    />
                  )
                })}
              </div>

              {/* Filtros y Búsqueda */}
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Búsqueda */}
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Buscar promociones..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Filtros */}
                  <div className="flex gap-4">
                    <select
                      value={filterEstado}
                      onChange={(e) => setFilterEstado(e.target.value)}
                      className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="todos">Todos los estados</option>
                      <option value="activa">Activa</option>
                      <option value="próxima">Próxima</option>
                      <option value="expirada">Expirada</option>
                    </select>

                    <select
                      value={filterTipo}
                      onChange={(e) => setFilterTipo(e.target.value)}
                      className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="todos">Todos los tipos</option>
                      <option value="Descuento por volumen">Descuento por volumen</option>
                      <option value="Combo">Combo</option>
                      <option value="Descuento directo">Descuento directo</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Tabla de Promociones */}
              <div className="bg-white rounded-lg border border-slate-200">
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-800">Promociones</h2>
                  <p className="text-slate-600 mt-1">Gestiona todas tus promociones activas y próximas</p>
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