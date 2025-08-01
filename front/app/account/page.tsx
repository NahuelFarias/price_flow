"use client"

import * as React from "react"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Shield, 
  Settings,
  LogOut,
  Edit,
  Save,
  X
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

export default function AccountPage() {
  const [isEditing, setIsEditing] = React.useState(false)
  const [userData, setUserData] = React.useState({
    name: "María González",
    email: "maria@distribuidora.com",
    phone: "+54 11 1234-5678",
    company: "Distribuidora González S.A.",
    address: "Av. Corrientes 1234, CABA",
    role: "Administrador",
    lastLogin: "2024-03-23 14:30"
  })
  const [editData, setEditData] = React.useState({ ...userData })
  const { toast, toasts, dismiss } = useToast()

  const handleEdit = () => {
    setEditData({ ...userData })
    setIsEditing(true)
  }

  const handleSave = () => {
    setUserData({ ...editData })
    setIsEditing(false)
    toast({
      variant: "success",
      title: "Perfil actualizado",
      description: "Los cambios se han guardado correctamente",
    })
  }

  const handleCancel = () => {
    setEditData({ ...userData })
    setIsEditing(false)
  }

  const handleLogout = () => {
    toast({
      variant: "info",
      title: "Cerrando sesión",
      description: "Hasta pronto, María!",
    })
    
    setTimeout(() => {
      window.location.href = "/login"
    }, 1500)
  }

  const headerActions = (
    <>
      {isEditing ? (
        <>
          <PfButton
            variant="outline"
            onClick={handleCancel}
            className="flex items-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Cancelar</span>
          </PfButton>
          <PfButton
            onClick={handleSave}
            className="flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Guardar</span>
          </PfButton>
        </>
      ) : (
        <PfButton
          onClick={handleEdit}
          className="flex items-center space-x-2"
        >
          <Edit className="h-4 w-4" />
          <span>Editar Perfil</span>
        </PfButton>
      )}
    </>
  )

  return (
    <AppLayout activeSection="account">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <PageHeader
          title="Mi Cuenta"
          description="Gestiona tu perfil y configuración"
          actions={headerActions}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información del Perfil */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información Personal */}
            <PfCard>
              <div className="flex items-center space-x-2 mb-6">
                <User className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-slate-800">Información Personal</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nombre Completo
                  </label>
                  {isEditing ? (
                    <PfInput
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                  ) : (
                    <p className="text-slate-900">{userData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <PfInput
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    />
                  ) : (
                    <p className="text-slate-900">{userData.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Teléfono
                  </label>
                  {isEditing ? (
                    <PfInput
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    />
                  ) : (
                    <p className="text-slate-900">{userData.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Empresa
                  </label>
                  {isEditing ? (
                    <PfInput
                      value={editData.company}
                      onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                    />
                  ) : (
                    <p className="text-slate-900">{userData.company}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Dirección
                  </label>
                  {isEditing ? (
                    <PfInput
                      value={editData.address}
                      onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                    />
                  ) : (
                    <p className="text-slate-900">{userData.address}</p>
                  )}
                </div>
              </div>
            </PfCard>

            {/* Información de la Cuenta */}
            <PfCard>
              <div className="flex items-center space-x-2 mb-6">
                <Shield className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-slate-800">Información de la Cuenta</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Rol
                  </label>
                  <p className="text-slate-900">{userData.role}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Último Acceso
                  </label>
                  <p className="text-slate-900">{userData.lastLogin}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Estado de la Cuenta
                  </label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Activa
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Plan
                  </label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Premium
                  </span>
                </div>
              </div>
            </PfCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Avatar y Acciones Rápidas */}
            <PfCard>
              <div className="text-center">
                <div className="mx-auto h-20 w-20 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-2xl">
                    {userData.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{userData.name}</h3>
                <p className="text-slate-600 text-sm mb-4">{userData.role}</p>
                
                <div className="space-y-2">
                  <PfButton
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      toast({
                        variant: "info",
                        title: "Cambiar contraseña",
                        description: "Funcionalidad en desarrollo",
                      })
                    }}
                  >
                    Cambiar Contraseña
                  </PfButton>
                  
                  <PfButton
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      toast({
                        variant: "info",
                        title: "Configuración",
                        description: "Funcionalidad en desarrollo",
                      })
                    }}
                  >
                    Configuración
                  </PfButton>
                </div>
              </div>
            </PfCard>

            {/* Acciones de Cuenta */}
            <PfCard>
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="h-5 w-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-slate-800">Acciones</h3>
              </div>
              
              <div className="space-y-3">
                <PfButton
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    toast({
                      variant: "info",
                      title: "Exportar datos",
                      description: "Funcionalidad en desarrollo",
                    })
                  }}
                >
                  Exportar Datos
                </PfButton>
                
                <PfButton
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    toast({
                      variant: "info",
                      title: "Soporte",
                      description: "Funcionalidad en desarrollo",
                    })
                  }}
                >
                  Contactar Soporte
                </PfButton>
                
                <PfButton
                  variant="destructive"
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </PfButton>
              </div>
            </PfCard>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
