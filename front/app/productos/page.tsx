"use client"

import * as React from "react"
import { 
  Plus, 
  Search, 
  Upload,
  Download,
  Edit,
  Eye,
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Filter,
  MoreHorizontal,
  X,
  Save,
  Trash2,
  Copy,
  BarChart3,
  Calendar,
  Users,
  Tag,
  Truck,
  Info,
  CheckCircle,
  Clock,
  AlertCircle
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

// Datos de ejemplo para productos
const productosData = [
  {
    id: 1,
    nombre: "Coca Cola 2L",
    sku: "CC-2L-001",
    categoria: "Bebidas",
    marca: "Coca Cola",
    precio: 450,
    precioCosto: 350,
    margen: 23,
    stock: 150,
    stockMinimo: 20,
    estado: "activo",
    proveedor: "Coca Cola Argentina",
    descripcion: "Bebida gaseosa Coca Cola de 2 litros, sabor original",
    codigoBarras: "7891234567890",
    peso: 2100,
    dimensiones: "12 x 8 x 25",
    unidad: "Botella",
    fechaCreacion: "2024-01-15",
    ultimaActualizacion: "2024-03-20",
    ventasUltimoMes: 45,
    margenPromedio: 23.5,
    promocionesActivas: 2
  },
  {
    id: 2,
    nombre: "Pan Lactal",
    sku: "PL-500G-002",
    categoria: "Alimentos",
    marca: "Bimbo",
    precio: 280,
    precioCosto: 230,
    margen: 18,
    stock: 89,
    stockMinimo: 15,
    estado: "activo",
    proveedor: "Bimbo Argentina",
    descripcion: "Pan de molde lactal integral, 500g",
    codigoBarras: "7891234567891",
    peso: 500,
    dimensiones: "15 x 10 x 8",
    unidad: "Pack",
    fechaCreacion: "2024-01-10",
    ultimaActualizacion: "2024-03-18",
    ventasUltimoMes: 32,
    margenPromedio: 18.2,
    promocionesActivas: 1
  },
  {
    id: 3,
    nombre: "Detergente Ala",
    sku: "DA-1L-003",
    categoria: "Limpieza",
    marca: "Unilever",
    precio: 320,
    precioCosto: 240,
    margen: 25,
    stock: 45,
    stockMinimo: 10,
    estado: "activo",
    proveedor: "Unilever Argentina",
    descripcion: "Detergente líquido Ala, 1 litro, aroma lavanda",
    codigoBarras: "7891234567892",
    peso: 1000,
    dimensiones: "8 x 8 x 20",
    unidad: "Botella",
    fechaCreacion: "2024-01-20",
    ultimaActualizacion: "2024-03-15",
    ventasUltimoMes: 28,
    margenPromedio: 25.0,
    promocionesActivas: 0
  },
  {
    id: 4,
    nombre: "Aceite Natura",
    sku: "AN-1L-004",
    categoria: "Alimentos",
    marca: "Natura",
    precio: 890,
    precioCosto: 756,
    margen: 15,
    stock: 23,
    stockMinimo: 25,
    estado: "bajo_stock",
    proveedor: "Natura Argentina",
    descripcion: "Aceite de girasol Natura, 1 litro, botella de vidrio",
    codigoBarras: "7891234567893",
    peso: 1000,
    dimensiones: "8 x 8 x 25",
    unidad: "Botella",
    fechaCreacion: "2024-01-05",
    ultimaActualizacion: "2024-03-22",
    ventasUltimoMes: 15,
    margenPromedio: 15.1,
    promocionesActivas: 1
  },
  {
    id: 5,
    nombre: "Leche La Serenísima",
    sku: "LS-1L-005",
    categoria: "Lácteos",
    marca: "La Serenísima",
    precio: 180,
    precioCosto: 158,
    margen: 12,
    stock: 0,
    stockMinimo: 30,
    estado: "sin_stock",
    proveedor: "La Serenísima",
    descripcion: "Leche entera La Serenísima, 1 litro, tetra pack",
    codigoBarras: "7891234567894",
    peso: 1000,
    dimensiones: "7 x 7 x 18",
    unidad: "Tetra",
    fechaCreacion: "2024-01-12",
    ultimaActualizacion: "2024-03-21",
    ventasUltimoMes: 67,
    margenPromedio: 12.2,
    promocionesActivas: 0
  },
  {
    id: 6,
    nombre: "Yogur Danone",
    sku: "YD-1L-006",
    categoria: "Lácteos",
    marca: "Danone",
    precio: 220,
    precioCosto: 176,
    margen: 20,
    stock: 67,
    stockMinimo: 20,
    estado: "activo",
    proveedor: "Danone Argentina",
    descripcion: "Yogur natural Danone, 1 litro, sin azúcar",
    codigoBarras: "7891234567895",
    peso: 1000,
    dimensiones: "8 x 8 x 15",
    unidad: "Botella",
    fechaCreacion: "2024-01-18",
    ultimaActualizacion: "2024-03-19",
    ventasUltimoMes: 41,
    margenPromedio: 20.0,
    promocionesActivas: 1
  },
  {
    id: 7,
    nombre: "Arroz Gallo",
    sku: "AG-1KG-007",
    categoria: "Alimentos",
    marca: "Gallo",
    precio: 150,
    precioCosto: 126,
    margen: 16,
    stock: 120,
    stockMinimo: 50,
    estado: "activo",
    proveedor: "Molinos Río de la Plata",
    descripcion: "Arroz largo fino Gallo, 1 kg, bolsa",
    codigoBarras: "7891234567896",
    peso: 1000,
    dimensiones: "20 x 15 x 3",
    unidad: "Kg",
    fechaCreacion: "2024-01-08",
    ultimaActualizacion: "2024-03-17",
    ventasUltimoMes: 89,
    margenPromedio: 16.0,
    promocionesActivas: 2
  },
  {
    id: 8,
    nombre: "Aceite de Oliva",
    sku: "AO-500ML-008",
    categoria: "Alimentos",
    marca: "Natura",
    precio: 1200,
    precioCosto: 840,
    margen: 30,
    stock: 15,
    stockMinimo: 20,
    estado: "bajo_stock",
    proveedor: "Natura Argentina",
    descripcion: "Aceite de oliva extra virgen Natura, 500ml, botella de vidrio",
    codigoBarras: "7891234567897",
    peso: 500,
    dimensiones: "6 x 6 x 20",
    unidad: "Botella",
    fechaCreacion: "2024-01-25",
    ultimaActualizacion: "2024-03-23",
    ventasUltimoMes: 12,
    margenPromedio: 30.0,
    promocionesActivas: 0
  }
]

const columns = [
  { key: "nombre" as const, label: "Producto", sortable: true },
  { key: "sku" as const, label: "SKU", sortable: true },
  { key: "categoria" as const, label: "Categoría", sortable: true },
  { key: "marca" as const, label: "Marca", sortable: true },
  { key: "precio" as const, label: "Precio", sortable: true },
  { key: "margen" as const, label: "Margen", sortable: true },
  { key: "stock" as const, label: "Stock", sortable: true },
  { key: "estado" as const, label: "Estado", sortable: true },
]

// Datos para métricas de productos
const metricasProductos = [
  {
    titulo: "Total productos",
    valor: "247",
    descripcion: "+12 este mes",
    color: "bg-blue-100",
    icono: Package,
    colorIcono: "text-blue-600"
  },
  {
    titulo: "Productos activos",
    valor: "234",
    descripcion: "95% del total",
    color: "bg-green-100",
    icono: TrendingUp,
    colorIcono: "text-green-600"
  },
  {
    titulo: "Productos sin stock",
    valor: "8",
    descripcion: "Requieren reposición",
    color: "bg-red-100",
    icono: AlertTriangle,
    colorIcono: "text-red-600"
  },
  {
    titulo: "Margen promedio",
    valor: "20.5%",
    descripcion: "+2.1% vs mes anterior",
    color: "bg-purple-100",
    icono: DollarSign,
    colorIcono: "text-purple-600"
  }
]

export default function ProductosPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [filterCategoria, setFilterCategoria] = React.useState("todos")
  const [filterEstado, setFilterEstado] = React.useState("todos")
  const [filterMarca, setFilterMarca] = React.useState("todos")
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("productos")
  const [showImportModal, setShowImportModal] = React.useState(false)
  const [showDetailsModal, setShowDetailsModal] = React.useState(false)
  const [selectedProducto, setSelectedProducto] = React.useState<any>(null)
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

  // Filtrar productos
  const filteredProductos = productosData.filter(producto => {
    const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         producto.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         producto.marca.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategoria = filterCategoria === "todos" || producto.categoria === filterCategoria
    const matchesEstado = filterEstado === "todos" || producto.estado === filterEstado
    const matchesMarca = filterMarca === "todos" || producto.marca === filterMarca
    
    return matchesSearch && matchesCategoria && matchesEstado && matchesMarca
  })

  const handleCrearProducto = () => {
    window.location.href = "/productos/crear"
  }

  const handleImportarExcel = () => {
    setShowImportModal(true)
  }

  const handleExportarExcel = () => {
    toast({
      variant: "success",
      title: "Exportando productos",
      description: "Descargando archivo Excel...",
    })
  }

  const handleVerDetalles = (producto: any) => {
    setSelectedProducto(producto)
    setShowDetailsModal(true)
  }

  const handleEditarProducto = (producto: any) => {
    toast({
      variant: "info",
      title: "Editar producto",
      description: `Editando: ${producto.nombre}`,
    })
  }

  const handleEliminarProducto = (producto: any) => {
    if (confirm(`¿Estás seguro de que quieres eliminar "${producto.nombre}"?`)) {
      toast({
        variant: "success",
        title: "Producto eliminado",
        description: `${producto.nombre} ha sido eliminado del catálogo`,
      })
      setShowDetailsModal(false)
    }
  }

  const handleCopiarSKU = (sku: string) => {
    navigator.clipboard.writeText(sku)
    toast({
      variant: "success",
      title: "SKU copiado",
      description: "El código SKU ha sido copiado al portapapeles",
    })
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "activo":
        return "bg-green-100 text-green-800"
      case "bajo_stock":
        return "bg-yellow-100 text-yellow-800"
      case "sin_stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "activo":
        return <CheckCircle className="h-4 w-4" />
      case "bajo_stock":
        return <AlertTriangle className="h-4 w-4" />
      case "sin_stock":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const categorias = [...new Set(productosData.map(p => p.categoria))]
  const marcas = [...new Set(productosData.map(p => p.marca))]

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
                  <h1 className="text-3xl font-bold text-slate-800">Catálogo de Productos</h1>
                  <p className="text-slate-600 mt-2">Gestiona tu inventario de productos</p>
                </div>
                <div className="flex space-x-3">
                  <PfButton variant="outline" onClick={handleImportarExcel} className="flex items-center space-x-2">
                    <Upload className="h-4 w-4" />
                    <span>Importar Excel</span>
                  </PfButton>
                  <PfButton variant="outline" onClick={handleExportarExcel} className="flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Exportar</span>
                  </PfButton>
                  <PfButton onClick={handleCrearProducto} className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Crear Producto</span>
                  </PfButton>
                </div>
              </div>

              {/* Métricas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metricasProductos.map((metrica, index) => {
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
                        placeholder="Buscar productos por nombre, SKU o marca..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Filtros */}
                  <div className="flex gap-4">
                    <select
                      value={filterCategoria}
                      onChange={(e) => setFilterCategoria(e.target.value)}
                      className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="todos">Todas las categorías</option>
                      {categorias.map(categoria => (
                        <option key={categoria} value={categoria}>{categoria}</option>
                      ))}
                    </select>

                    <select
                      value={filterMarca}
                      onChange={(e) => setFilterMarca(e.target.value)}
                      className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="todos">Todas las marcas</option>
                      {marcas.map(marca => (
                        <option key={marca} value={marca}>{marca}</option>
                      ))}
                    </select>

                    <select
                      value={filterEstado}
                      onChange={(e) => setFilterEstado(e.target.value)}
                      className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="todos">Todos los estados</option>
                      <option value="activo">Activo</option>
                      <option value="bajo_stock">Bajo stock</option>
                      <option value="sin_stock">Sin stock</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Tabla de Productos */}
              <div className="bg-white rounded-lg border border-slate-200">
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-800">Productos</h2>
                  <p className="text-slate-600 mt-1">Gestiona todos tus productos y su información</p>
                </div>
                
                <PfTable
                  data={filteredProductos}
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

        {/* Modal de Importación */}
        {showImportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Importar Productos desde Excel</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Seleccionar archivo Excel
                  </label>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="bg-slate-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Formato requerido:</h4>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>• Nombre del producto</li>
                    <li>• SKU (código único)</li>
                    <li>• Categoría</li>
                    <li>• Marca</li>
                    <li>• Precio</li>
                    <li>• Stock inicial</li>
                  </ul>
                </div>

                <div className="flex justify-end space-x-3">
                  <PfButton
                    variant="outline"
                    onClick={() => setShowImportModal(false)}
                  >
                    Cancelar
                  </PfButton>
                  <PfButton
                    onClick={() => {
                      toast({
                        variant: "success",
                        title: "Productos importados",
                        description: "Se han importado 15 productos exitosamente",
                      })
                      setShowImportModal(false)
                    }}
                  >
                    Importar
                  </PfButton>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Detalles del Producto */}
        {showDetailsModal && selectedProducto && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              {/* Header del Modal */}
              <div className="flex justify-between items-center p-6 border-b border-slate-200">
                <div className="flex items-center space-x-3">
                  <Package className="h-6 w-6 text-blue-600" />
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">{selectedProducto.nombre}</h2>
                    <p className="text-slate-600">Detalles completos del producto</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <PfButton
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopiarSKU(selectedProducto.sku)}
                    className="flex items-center space-x-1"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copiar SKU</span>
                  </PfButton>
                  <PfButton
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditarProducto(selectedProducto)}
                    className="flex items-center space-x-1"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Editar</span>
                  </PfButton>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-slate-500" />
                  </button>
                </div>
              </div>

              {/* Contenido del Modal */}
              <div className="p-6 space-y-6">
                {/* Información Principal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Columna Izquierda */}
                  <div className="space-y-6">
                    {/* Información Básica */}
                    <div className="bg-slate-50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                        <Info className="h-5 w-5 text-blue-600" />
                        <span>Información Básica</span>
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-600">SKU:</span>
                          <span className="font-medium">{selectedProducto.sku}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Categoría:</span>
                          <span className="font-medium">{selectedProducto.categoria}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Marca:</span>
                          <span className="font-medium">{selectedProducto.marca}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Proveedor:</span>
                          <span className="font-medium">{selectedProducto.proveedor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Unidad:</span>
                          <span className="font-medium">{selectedProducto.unidad}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Estado:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getEstadoColor(selectedProducto.estado)}`}>
                            {getEstadoIcon(selectedProducto.estado)}
                            <span>{selectedProducto.estado.replace('_', ' ')}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Información Comercial */}
                    <div className="bg-slate-50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        <span>Información Comercial</span>
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Precio de Venta:</span>
                          <span className="font-medium">${selectedProducto.precio}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Precio de Costo:</span>
                          <span className="font-medium">${selectedProducto.precioCosto}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Margen de Ganancia:</span>
                          <span className="font-medium text-green-600">{selectedProducto.margen}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Ventas (último mes):</span>
                          <span className="font-medium">{selectedProducto.ventasUltimoMes} unidades</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Promociones activas:</span>
                          <span className="font-medium">{selectedProducto.promocionesActivas}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Columna Derecha */}
                  <div className="space-y-6">
                    {/* Gestión de Stock */}
                    <div className="bg-slate-50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-orange-600" />
                        <span>Gestión de Stock</span>
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Stock Actual:</span>
                          <span className={`font-medium ${selectedProducto.stock === 0 ? 'text-red-600' : selectedProducto.stock <= selectedProducto.stockMinimo ? 'text-yellow-600' : 'text-green-600'}`}>
                            {selectedProducto.stock} unidades
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Stock Mínimo:</span>
                          <span className="font-medium">{selectedProducto.stockMinimo} unidades</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Nivel de Stock:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedProducto.stock === 0 ? 'bg-red-100 text-red-800' :
                            selectedProducto.stock <= selectedProducto.stockMinimo ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {selectedProducto.stock === 0 ? 'Sin stock' :
                             selectedProducto.stock <= selectedProducto.stockMinimo ? 'Bajo stock' :
                             'Stock normal'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Información Adicional */}
                    <div className="bg-slate-50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                        <Tag className="h-5 w-5 text-purple-600" />
                        <span>Información Adicional</span>
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Código de Barras:</span>
                          <span className="font-medium">{selectedProducto.codigoBarras}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Peso:</span>
                          <span className="font-medium">{selectedProducto.peso}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Dimensiones:</span>
                          <span className="font-medium">{selectedProducto.dimensiones} cm</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Fecha de Creación:</span>
                          <span className="font-medium">{selectedProducto.fechaCreacion}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Última Actualización:</span>
                          <span className="font-medium">{selectedProducto.ultimaActualizacion}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Descripción */}
                {selectedProducto.descripcion && (
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">Descripción</h3>
                    <p className="text-slate-700">{selectedProducto.descripcion}</p>
                  </div>
                )}

                {/* Acciones */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
                  <PfButton
                    variant="outline"
                    onClick={() => setShowDetailsModal(false)}
                  >
                    Cerrar
                  </PfButton>
                  <PfButton
                    variant="outline"
                    onClick={() => handleEditarProducto(selectedProducto)}
                    className="flex items-center space-x-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Editar Producto</span>
                  </PfButton>
                  <PfButton
                    variant="outline"
                    onClick={() => {
                      // Aquí iría la lógica para ver reportes del producto
                      toast({
                        variant: "info",
                        title: "Reportes del producto",
                        description: `Generando reportes para ${selectedProducto.nombre}`,
                      })
                    }}
                    className="flex items-center space-x-2"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Ver Reportes</span>
                  </PfButton>
                  <PfButton
                    variant="destructive"
                    onClick={() => handleEliminarProducto(selectedProducto)}
                    className="flex items-center space-x-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Eliminar</span>
                  </PfButton>
                </div>
              </div>
            </div>
          </div>
        )}

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