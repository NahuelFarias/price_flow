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

import { AppLayout } from "@/components/layout/app-layout"
import { PageHeader } from "@/components/ui/page-header"
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
  const { toast, toasts, dismiss } = useToast()

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
      title: "Promoción creada exitosamente",
      description: `"${formData.nombre}" ha sido creada y está activa`,
    })
    
    setTimeout(() => {
      window.location.href = "/promociones"
    }, 1500)
  }

  const handleCancel = () => {
    if (Object.values(formData).some(value => value !== "" && value !== "Todos")) {
      if (confirm("¿Estás seguro de que quieres cancelar? Se perderán los datos ingresados.")) {
        window.location.href = "/promociones"
      }
    } else {
      window.location.href = "/promociones"
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nombre de la Promoción *
              </label>
              <PfInput
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                placeholder="Ej: Descuento Coca Cola 2L"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tipo de Promoción *
              </label>
              <select
                value={formData.tipo}
                onChange={(e) => handleInputChange("tipo", e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona un tipo</option>
                {tiposPromocion.map(tipo => (
                  <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
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
                placeholder="Describe la promoción, condiciones especiales, etc."
                rows={3}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Productos Incluidos *
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto border border-slate-200 rounded-lg p-3">
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
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    />
                    <span className="text-sm text-slate-700">{producto}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Descuento *
              </label>
              <div className="flex items-center space-x-2">
                <PfInput
                  value={formData.descuento}
                  onChange={(e) => handleInputChange("descuento", e.target.value)}
                  placeholder="15"
                  type="number"
                  min="0"
                  max="100"
                  className="w-32"
                />
                <span className="text-slate-600">%</span>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Clientes Objetivo *
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Fecha de Inicio *
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
                  Fecha de Fin *
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
                Condiciones Especiales
              </label>
              <textarea
                value={formData.condiciones}
                onChange={(e) => handleInputChange("condiciones", e.target.value)}
                placeholder="Condiciones especiales, restricciones, etc."
                rows={3}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Resumen de la Promoción</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Nombre:</span>
                  <span className="font-medium">{formData.nombre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tipo:</span>
                  <span className="font-medium">{formData.tipo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Descuento:</span>
                  <span className="font-medium">{formData.descuento}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Productos:</span>
                  <span className="font-medium">{formData.productos.length} seleccionados</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Clientes:</span>
                  <span className="font-medium">{formData.clientes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Período:</span>
                  <span className="font-medium">{formData.fechaInicio} - {formData.fechaFin}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-800">¿Todo listo?</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Revisa que toda la información sea correcta antes de crear la promoción.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
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
    <AppLayout activeSection="promociones" showSidebar={false}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <PageHeader
          title="Crear Nueva Promoción"
          description="Crea una promoción paso a paso"
          actions={headerActions}
        />

        {/* Steps Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center space-x-2 ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-slate-400'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isActive ? 'bg-blue-100' : isCompleted ? 'bg-green-100' : 'bg-slate-100'
                    }`}>
                      {isCompleted ? (
                        <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-200' : 'bg-slate-200'
                    }`}></div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <PfButton
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Anterior
          </PfButton>

          <div className="flex space-x-3">
            <PfButton
              variant="outline"
              onClick={handleCancel}
            >
              Cancelar
            </PfButton>
            
            {currentStep === 4 ? (
              <PfButton
                onClick={handleCrearPromocion}
                className="flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Crear Promoción</span>
              </PfButton>
            ) : (
              <PfButton
                onClick={handleNext}
                className="flex items-center space-x-2"
              >
                <span>Siguiente</span>
              </PfButton>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
} 