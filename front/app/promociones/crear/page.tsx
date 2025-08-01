"use client"

import * as React from "react"
import { 
  ArrowLeft, 
  Save, 
  X,
  Target,
  Calendar,
  Package,
  Users,
  Percent,
  DollarSign
} from "lucide-react"

import { Navbar } from "@/components/layout/navbar"
import { PfButton } from "@/components/ui/pf-button"
import { PfInput } from "@/components/ui/pf-input"
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  useToast,
} from "@/components/ui/pf-toast"

export default function CrearPromocionPage() {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [formData, setFormData] = React.useState({
    nombre: "",
    tipo: "",
    descuento: "",
    fechaInicio: "",
    fechaFin: "",
    productos: [] as string[],
    clientes: "Todos",
    descripcion: "",
    condiciones: ""
  })
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

  const steps = [
    { id: 1, title: "Información Básica", icon: Target },
    { id: 2, title: "Productos y Descuentos", icon: Package },
    { id: 3, title: "Clientes y Fechas", icon: Users },
    { id: 4, title: "Revisar y Crear", icon: Save }
  ]

  const tiposPromocion = [
    { value: "Descuento por volumen", label: "Descuento por volumen" },
    { value: "Combo", label: "Combo de productos" },
    { value: "Descuento directo", label: "Descuento directo" },
    { value: "Promoción cruzada", label: "Promoción cruzada" }
  ]

  const productosDisponibles = [
    "Coca Cola 2L",
    "Pan Lactal",
    "Detergente Ala",
    "Aceite Natura",
    "Leche La Serenísima",
    "Yogur Danone",
    "Arroz Gallo",
    "Aceite de Oliva"
  ]

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCrearPromocion = () => {
    toast({
      variant: "success",
      title: "Promoción creada",
      description: "La promoción se ha creado exitosamente",
    })
    // Aquí iría la lógica para guardar en la API
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nombre de la promoción
              </label>
              <PfInput
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                placeholder="Ej: Descuento Coca Cola 2L"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tipo de promoción
              </label>
              <select
                value={formData.tipo}
                onChange={(e) => handleInputChange("tipo", e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar tipo</option>
                {tiposPromocion.map(tipo => (
                  <option key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Descripción
              </label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => handleInputChange("descripcion", e.target.value)}
                placeholder="Describe los detalles de la promoción..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Productos incluidos
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-slate-200 rounded-lg p-3">
                {productosDisponibles.map(producto => (
                  <label key={producto} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.productos.includes(producto)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleInputChange("productos", [...formData.productos, producto])
                        } else {
                          handleInputChange("productos", formData.productos.filter(p => p !== producto))
                        }
                      }}
                      className="rounded border-slate-300"
                    />
                    <span className="text-sm">{producto}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Porcentaje de descuento
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="number"
                  value={formData.descuento}
                  onChange={(e) => handleInputChange("descuento", e.target.value)}
                  placeholder="15"
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Clientes objetivo
              </label>
              <select
                value={formData.clientes}
                onChange={(e) => handleInputChange("clientes", e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Todos">Todos los clientes</option>
                <option value="Premium">Solo clientes premium</option>
                <option value="Grandes compradores">Grandes compradores</option>
                <option value="Nuevos clientes">Nuevos clientes</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Fecha de inicio
                </label>
                <input
                  type="date"
                  value={formData.fechaInicio}
                  onChange={(e) => handleInputChange("fechaInicio", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Fecha de fin
                </label>
                <input
                  type="date"
                  value={formData.fechaFin}
                  onChange={(e) => handleInputChange("fechaFin", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Condiciones especiales
              </label>
              <textarea
                value={formData.condiciones}
                onChange={(e) => handleInputChange("condiciones", e.target.value)}
                placeholder="Condiciones adicionales de la promoción..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Resumen de la promoción</h3>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-slate-600">Nombre:</span>
                  <p className="text-slate-800">{formData.nombre}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Tipo:</span>
                  <p className="text-slate-800">{formData.tipo}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Descuento:</span>
                  <p className="text-slate-800">{formData.descuento}%</p>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Clientes:</span>
                  <p className="text-slate-800">{formData.clientes}</p>
                </div>
                <div className="col-span-2">
                  <span className="font-medium text-slate-600">Productos:</span>
                  <p className="text-slate-800">{formData.productos.join(", ")}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Inicio:</span>
                  <p className="text-slate-800">{formData.fechaInicio}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Fin:</span>
                  <p className="text-slate-800">{formData.fechaFin}</p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
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
        />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <PfButton variant="ghost" size="icon" onClick={() => window.history.back()}>
                  <ArrowLeft className="h-4 w-4" />
                </PfButton>
                <div>
                  <h1 className="text-3xl font-bold text-slate-800">Crear Promoción</h1>
                  <p className="text-slate-600 mt-1">Configura una nueva promoción para impulsar tus ventas</p>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = currentStep === step.id
                  const isCompleted = currentStep > step.id
                  
                  return (
                    <div key={step.id} className="flex items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        isActive 
                          ? "border-blue-500 bg-blue-500 text-white" 
                          : isCompleted 
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-slate-300 bg-white text-slate-400"
                      }`}>
                        {isCompleted ? (
                          <span className="text-sm font-bold">✓</span>
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>
                      <span className={`ml-2 text-sm font-medium ${
                        isActive ? "text-blue-600" : "text-slate-500"
                      }`}>
                        {step.title}
                      </span>
                      {index < steps.length - 1 && (
                        <div className={`w-16 h-0.5 mx-4 ${
                          isCompleted ? "bg-green-500" : "bg-slate-200"
                        }`} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              {renderStepContent()}
            </div>

            {/* Actions */}
            <div className="flex justify-between mt-8">
              <PfButton
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Anterior
              </PfButton>

              <div className="flex space-x-4">
                <PfButton
                  variant="outline"
                  onClick={() => window.history.back()}
                >
                  Cancelar
                </PfButton>

                {currentStep === 4 ? (
                  <PfButton onClick={handleCrearPromocion}>
                    Crear Promoción
                  </PfButton>
                ) : (
                  <PfButton onClick={handleNext}>
                    Siguiente
                  </PfButton>
                )}
              </div>
            </div>
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