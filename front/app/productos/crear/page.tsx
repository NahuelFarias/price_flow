"use client"

import * as React from "react"
import { 
  ArrowLeft, 
  Save, 
  X,
  Package,
  DollarSign,
  TrendingUp,
  Tag,
  Truck,
  Info
} from "lucide-react"

import { AppLayout } from "@/components/layout/app-layout"
import { PageHeader } from "@/components/ui/page-header"
import { PfButton } from "@/components/ui/pf-button"
import { PfInput } from "@/components/ui/pf-input"
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

export default function CrearProductoPage() {
  const [formData, setFormData] = React.useState({
    nombre: "",
    sku: "",
    categoria: "",
    marca: "",
    proveedor: "",
    descripcion: "",
    precio: "",
    precioCosto: "",
    margen: "",
    stock: "",
    stockMinimo: "",
    codigoBarras: "",
    peso: "",
    dimensiones: "",
    unidad: "",
    activo: true
  })
  const { toast, toasts, dismiss } = useToast()

  const categorias = [
    "Alimentos",
    "Bebidas", 
    "Limpieza",
    "Lácteos",
    "Higiene",
    "Otros"
  ]

  const marcas = [
    "Coca Cola",
    "Bimbo",
    "Unilever",
    "Natura",
    "La Serenísima",
    "Danone",
    "Gallo",
    "Otra"
  ]

  const proveedores = [
    "Coca Cola Argentina",
    "Bimbo Argentina",
    "Unilever Argentina",
    "Natura Argentina",
    "La Serenísima",
    "Danone Argentina",
    "Molinos Río de la Plata",
    "Otro"
  ]

  const unidades = [
    "Botella",
    "Pack",
    "Kg",
    "Litro",
    "Tetra",
    "Unidad",
    "Caja"
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Calcular margen automáticamente si se modifican precio o precioCosto
    if ((field === "precio" || field === "precioCosto") && 
        formData.precio && formData.precioCosto && 
        !isNaN(Number(formData.precio)) && !isNaN(Number(formData.precioCosto))) {
      const precio = Number(formData.precio)
      const precioCosto = Number(formData.precioCosto)
      if (precio > 0 && precioCosto > 0) {
        const margenCalculado = ((precio - precioCosto) / precio * 100).toFixed(1)
        setFormData(prev => ({
          ...prev,
          margen: margenCalculado
        }))
      }
    }
  }

  const validateForm = () => {
    const errors: string[] = []
    
    if (!formData.nombre.trim()) errors.push("El nombre del producto es requerido")
    if (!formData.sku.trim()) errors.push("El SKU es requerido")
    if (!formData.categoria) errors.push("La categoría es requerida")
    if (!formData.marca) errors.push("La marca es requerida")
    if (!formData.precio || Number(formData.precio) <= 0) errors.push("El precio debe ser mayor a 0")
    if (!formData.precioCosto || Number(formData.precioCosto) <= 0) errors.push("El precio de costo debe ser mayor a 0")
    if (!formData.stock || Number(formData.stock) < 0) errors.push("El stock no puede ser negativo")
    if (!formData.stockMinimo || Number(formData.stockMinimo) < 0) errors.push("El stock mínimo no puede ser negativo")
    
    return errors
  }

  const handleSubmit = () => {
    const errors = validateForm()
    
    if (errors.length > 0) {
      toast({
        variant: "error",
        title: "Errores en el formulario",
        description: errors.join(", "),
      })
      return
    }

    toast({
      variant: "success",
      title: "Producto creado exitosamente",
      description: `"${formData.nombre}" ha sido agregado al catálogo`,
    })
    
    setTimeout(() => {
      window.location.href = "/productos"
    }, 1500)
  }

  const handleCancel = () => {
    if (Object.values(formData).some(value => value !== "" && value !== true)) {
      if (confirm("¿Estás seguro de que quieres cancelar? Se perderán los datos ingresados.")) {
        window.location.href = "/productos"
      }
    } else {
      window.location.href = "/productos"
    }
  }

  const headerActions = (
    <PfButton
      variant="outline"
      onClick={handleCancel}
      className="flex items-center space-x-2"
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Volver</span>
    </PfButton>
  )

  return (
    <AppLayout activeSection="productos" showSidebar={false}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <PageHeader
          title="Crear Nuevo Producto"
          description="Agrega un nuevo producto al catálogo"
          actions={headerActions}
        />

        {/* Formulario */}
        <div className="space-y-6">
          {/* Información Básica */}
          <PfCard>
            <div className="flex items-center space-x-2 mb-4">
              <Info className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-slate-800">Información Básica</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nombre del Producto *
                </label>
                <PfInput
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  placeholder="Ej: Coca Cola 2L"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  SKU *
                </label>
                <PfInput
                  value={formData.sku}
                  onChange={(e) => handleInputChange("sku", e.target.value)}
                  placeholder="Ej: CC-2L-001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Categoría *
                </label>
                <select
                  value={formData.categoria}
                  onChange={(e) => handleInputChange("categoria", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona una categoría</option>
                  {categorias.map(categoria => (
                    <option key={categoria} value={categoria}>{categoria}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Marca *
                </label>
                <select
                  value={formData.marca}
                  onChange={(e) => handleInputChange("marca", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona una marca</option>
                  {marcas.map(marca => (
                    <option key={marca} value={marca}>{marca}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Proveedor
                </label>
                <select
                  value={formData.proveedor}
                  onChange={(e) => handleInputChange("proveedor", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona un proveedor</option>
                  {proveedores.map(proveedor => (
                    <option key={proveedor} value={proveedor}>{proveedor}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Unidad de Venta
                </label>
                <select
                  value={formData.unidad}
                  onChange={(e) => handleInputChange("unidad", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona una unidad</option>
                  {unidades.map(unidad => (
                    <option key={unidad} value={unidad}>{unidad}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Descripción
              </label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => handleInputChange("descripcion", e.target.value)}
                placeholder="Describe el producto, características, etc."
                rows={3}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </PfCard>

          {/* Información Comercial */}
          <PfCard>
            <div className="flex items-center space-x-2 mb-4">
              <DollarSign className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-slate-800">Información Comercial</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Precio de Venta *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                  <PfInput
                    value={formData.precio}
                    onChange={(e) => handleInputChange("precio", e.target.value)}
                    placeholder="0.00"
                    type="number"
                    min="0"
                    step="0.01"
                    className="pl-8"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Precio de Costo *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                  <PfInput
                    value={formData.precioCosto}
                    onChange={(e) => handleInputChange("precioCosto", e.target.value)}
                    placeholder="0.00"
                    type="number"
                    min="0"
                    step="0.01"
                    className="pl-8"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Margen de Ganancia
                </label>
                <div className="relative">
                  <PfInput
                    value={formData.margen}
                    onChange={(e) => handleInputChange("margen", e.target.value)}
                    placeholder="0.0"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    readOnly
                    className="pr-8"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">%</span>
                </div>
              </div>
            </div>
          </PfCard>

          {/* Gestión de Stock */}
          <PfCard>
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-slate-800">Gestión de Stock</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Stock Inicial *
                </label>
                <PfInput
                  value={formData.stock}
                  onChange={(e) => handleInputChange("stock", e.target.value)}
                  placeholder="0"
                  type="number"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Stock Mínimo *
                </label>
                <PfInput
                  value={formData.stockMinimo}
                  onChange={(e) => handleInputChange("stockMinimo", e.target.value)}
                  placeholder="0"
                  type="number"
                  min="0"
                />
              </div>
            </div>
          </PfCard>

          {/* Información Adicional */}
          <PfCard>
            <div className="flex items-center space-x-2 mb-4">
              <Tag className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-slate-800">Información Adicional</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Código de Barras
                </label>
                <PfInput
                  value={formData.codigoBarras}
                  onChange={(e) => handleInputChange("codigoBarras", e.target.value)}
                  placeholder="7891234567890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Peso (gramos)
                </label>
                <PfInput
                  value={formData.peso}
                  onChange={(e) => handleInputChange("peso", e.target.value)}
                  placeholder="1000"
                  type="number"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Dimensiones (cm)
                </label>
                <PfInput
                  value={formData.dimensiones}
                  onChange={(e) => handleInputChange("dimensiones", e.target.value)}
                  placeholder="12 x 8 x 25"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.activo}
                  onChange={(e) => handleInputChange("activo", e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                />
                <span className="text-sm font-medium text-slate-700">Producto activo</span>
              </label>
            </div>
          </PfCard>
        </div>

        {/* Acciones */}
        <div className="flex justify-end space-x-3 mt-8">
          <PfButton
            variant="outline"
            onClick={handleCancel}
          >
            Cancelar
          </PfButton>
          
          <PfButton
            onClick={handleSubmit}
            className="flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Crear Producto</span>
          </PfButton>
        </div>
      </div>
    </AppLayout>
  )
} 