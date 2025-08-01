"use client"

import * as React from "react"
import { 
  ArrowLeft,
  Save,
  X,
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Info
} from "lucide-react"

import { Navbar } from "@/components/layout/navbar"
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

// Datos de ejemplo para selectores
const categorias = [
  "Bebidas",
  "Alimentos",
  "Limpieza",
  "Lácteos",
  "Higiene Personal",
  "Snacks",
  "Congelados",
  "Bebidas Alcohólicas"
]

const marcas = [
  "Coca Cola",
  "Pepsi",
  "Bimbo",
  "La Serenísima",
  "Danone",
  "Unilever",
  "Natura",
  "Molinos Río de la Plata",
  "Quilmes",
  "Personal"
]

const proveedores = [
  "Coca Cola Argentina",
  "PepsiCo Argentina",
  "Bimbo Argentina",
  "La Serenísima",
  "Danone Argentina",
  "Unilever Argentina",
  "Natura Argentina",
  "Molinos Río de la Plata",
  "Cervecería y Maltería Quilmes",
  "Personal Care"
]

const unidades = [
  "Unidad",
  "Kg",
  "Litro",
  "Gramo",
  "Mililitro",
  "Caja",
  "Pack",
  "Botella",
  "Lata"
]

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
    unidad: "",
    peso: "",
    dimensiones: "",
    codigoBarras: "",
    activo: true
  })

  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre del producto es requerido"
    }

    if (!formData.sku.trim()) {
      newErrors.sku = "El SKU es requerido"
    } else if (formData.sku.length < 3) {
      newErrors.sku = "El SKU debe tener al menos 3 caracteres"
    }

    if (!formData.categoria) {
      newErrors.categoria = "Selecciona una categoría"
    }

    if (!formData.marca) {
      newErrors.marca = "Selecciona una marca"
    }

    if (!formData.proveedor) {
      newErrors.proveedor = "Selecciona un proveedor"
    }

    if (!formData.precio) {
      newErrors.precio = "El precio es requerido"
    } else if (isNaN(Number(formData.precio)) || Number(formData.precio) <= 0) {
      newErrors.precio = "El precio debe ser un número válido mayor a 0"
    }

    if (!formData.precioCosto) {
      newErrors.precioCosto = "El precio de costo es requerido"
    } else if (isNaN(Number(formData.precioCosto)) || Number(formData.precioCosto) <= 0) {
      newErrors.precioCosto = "El precio de costo debe ser un número válido mayor a 0"
    }

    if (!formData.stock) {
      newErrors.stock = "El stock inicial es requerido"
    } else if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = "El stock debe ser un número válido mayor o igual a 0"
    }

    if (!formData.stockMinimo) {
      newErrors.stockMinimo = "El stock mínimo es requerido"
    } else if (isNaN(Number(formData.stockMinimo)) || Number(formData.stockMinimo) < 0) {
      newErrors.stockMinimo = "El stock mínimo debe ser un número válido mayor o igual a 0"
    }

    if (!formData.unidad) {
      newErrors.unidad = "Selecciona una unidad"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast({
        variant: "error",
        title: "Error de validación",
        description: "Por favor, corrige los errores en el formulario",
      })
      return
    }

    setIsSubmitting(true)

    // Simular envío al servidor
    setTimeout(() => {
      toast({
        variant: "success",
        title: "Producto creado exitosamente",
        description: `"${formData.nombre}" ha sido agregado al catálogo`,
      })
      
      // Redirigir a la lista de productos
      setTimeout(() => {
        window.location.href = "/productos"
      }, 1500)
    }, 1000)
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

  // Calcular margen automáticamente
  React.useEffect(() => {
    if (formData.precio && formData.precioCosto) {
      const precio = Number(formData.precio)
      const costo = Number(formData.precioCosto)
      if (precio > 0 && costo > 0) {
        const margen = ((precio - costo) / precio) * 100
        setFormData(prev => ({ ...prev, margen: margen.toFixed(2) }))
      }
    }
  }, [formData.precio, formData.precioCosto])

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Navbar */}
        <Navbar
          user={mockUser}
          activeSection="productos"
          onLogout={handleLogout}
          onAccountClick={handleAccountClick}
        />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <PfButton
                  variant="outline"
                  onClick={handleCancel}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Volver</span>
                </PfButton>
                <div>
                  <h1 className="text-3xl font-bold text-slate-800">Crear Nuevo Producto</h1>
                  <p className="text-slate-600 mt-2">Agrega un nuevo producto a tu catálogo</p>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Información Básica */}
              <PfCard>
                <div className="flex items-center space-x-2 mb-6">
                  <Package className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-slate-800">Información Básica</h2>
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
                      error={errors.nombre}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      SKU (Código Único) *
                    </label>
                    <PfInput
                      value={formData.sku}
                      onChange={(e) => handleInputChange("sku", e.target.value.toUpperCase())}
                      placeholder="Ej: CC-2L-001"
                      error={errors.sku}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Categoría *
                    </label>
                    <select
                      value={formData.categoria}
                      onChange={(e) => handleInputChange("categoria", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.categoria ? "border-red-500" : "border-slate-200"
                      }`}
                    >
                      <option value="">Selecciona una categoría</option>
                      {categorias.map(categoria => (
                        <option key={categoria} value={categoria}>{categoria}</option>
                      ))}
                    </select>
                    {errors.categoria && (
                      <p className="text-red-500 text-sm mt-1">{errors.categoria}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Marca *
                    </label>
                    <select
                      value={formData.marca}
                      onChange={(e) => handleInputChange("marca", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.marca ? "border-red-500" : "border-slate-200"
                      }`}
                    >
                      <option value="">Selecciona una marca</option>
                      {marcas.map(marca => (
                        <option key={marca} value={marca}>{marca}</option>
                      ))}
                    </select>
                    {errors.marca && (
                      <p className="text-red-500 text-sm mt-1">{errors.marca}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Proveedor *
                    </label>
                    <select
                      value={formData.proveedor}
                      onChange={(e) => handleInputChange("proveedor", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.proveedor ? "border-red-500" : "border-slate-200"
                      }`}
                    >
                      <option value="">Selecciona un proveedor</option>
                      {proveedores.map(proveedor => (
                        <option key={proveedor} value={proveedor}>{proveedor}</option>
                      ))}
                    </select>
                    {errors.proveedor && (
                      <p className="text-red-500 text-sm mt-1">{errors.proveedor}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Unidad de Medida *
                    </label>
                    <select
                      value={formData.unidad}
                      onChange={(e) => handleInputChange("unidad", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.unidad ? "border-red-500" : "border-slate-200"
                      }`}
                    >
                      <option value="">Selecciona una unidad</option>
                      {unidades.map(unidad => (
                        <option key={unidad} value={unidad}>{unidad}</option>
                      ))}
                    </select>
                    {errors.unidad && (
                      <p className="text-red-500 text-sm mt-1">{errors.unidad}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Descripción
                    </label>
                    <textarea
                      value={formData.descripcion}
                      onChange={(e) => handleInputChange("descripcion", e.target.value)}
                      placeholder="Describe el producto, características especiales, etc."
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </PfCard>

              {/* Información Comercial */}
              <PfCard>
                <div className="flex items-center space-x-2 mb-6">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <h2 className="text-xl font-semibold text-slate-800">Información Comercial</h2>
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
                        step="0.01"
                        min="0"
                        className="pl-8"
                        error={errors.precio}
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
                        step="0.01"
                        min="0"
                        className="pl-8"
                        error={errors.precioCosto}
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
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        className="pr-8"
                        disabled
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">%</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Calculado automáticamente</p>
                  </div>
                </div>
              </PfCard>

              {/* Información de Stock */}
              <PfCard>
                <div className="flex items-center space-x-2 mb-6">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  <h2 className="text-xl font-semibold text-slate-800">Gestión de Stock</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      error={errors.stock}
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
                      error={errors.stockMinimo}
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="activo"
                      checked={formData.activo}
                      onChange={(e) => handleInputChange("activo", e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    />
                    <label htmlFor="activo" className="text-sm font-medium text-slate-700">
                      Producto Activo
                    </label>
                  </div>
                </div>
              </PfCard>

              {/* Información Adicional */}
              <PfCard>
                <div className="flex items-center space-x-2 mb-6">
                  <Info className="h-5 w-5 text-purple-600" />
                  <h2 className="text-xl font-semibold text-slate-800">Información Adicional</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      placeholder="0"
                      type="number"
                      min="0"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Dimensiones (Largo x Ancho x Alto en cm)
                    </label>
                    <PfInput
                      value={formData.dimensiones}
                      onChange={(e) => handleInputChange("dimensiones", e.target.value)}
                      placeholder="Ej: 10 x 5 x 20"
                    />
                  </div>
                </div>
              </PfCard>

              {/* Botones de Acción */}
              <div className="flex justify-end space-x-4">
                <PfButton
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancelar
                </PfButton>
                <PfButton
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Guardando...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Crear Producto</span>
                    </>
                  )}
                </PfButton>
              </div>
            </form>
          </div>
        </main>

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