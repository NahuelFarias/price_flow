"use client"

import * as React from "react"
import { User, Mail, Shield, Clock, Edit3, LogOut, Globe, Bell, Key, ArrowLeft } from "lucide-react"

import { PfButton } from "@/components/ui/pf-button"
import { PfCard } from "@/components/ui/pf-card"
import { PfInput } from "@/components/ui/pf-input"
import {
  PfModal,
  PfModalContent,
  PfModalDescription,
  PfModalFooter,
  PfModalHeader,
  PfModalTitle,
  PfModalTrigger,
} from "@/components/ui/pf-modal"
import { useToast } from "@/components/ui/pf-toast"

// Simulación de datos del usuario
const mockUser = {
  id: "user_123",
  name: "María González",
  email: "maria@distribuidora.com",
  role: "Administrador",
  lastAccess: "2024-01-15 14:30:00",
  joinDate: "2023-06-15",
  preferences: {
    language: "es",
    notifications: true,
    theme: "light",
  },
}

export default function UserAccountPage() {
  const [user, setUser] = React.useState(mockUser)
  const [isEditing, setIsEditing] = React.useState(false)
  const [editForm, setEditForm] = React.useState({
    name: user.name,
    email: user.email,
  })
  const { toast } = useToast()

  const handleSaveProfile = () => {
    // Aquí iría la lógica para guardar el perfil
    setUser((prev) => ({
      ...prev,
      name: editForm.name,
      email: editForm.email,
    }))
    setIsEditing(false)

    toast({
      variant: "success",
      title: "Perfil actualizado",
      description: "Los cambios se guardaron correctamente.",
    })
  }

  const handleLogout = () => {
    // Aquí iría la lógica de logout con Auth0
    toast({
      variant: "info",
      title: "Cerrando sesión...",
      description: "Te estamos redirigiendo al login.",
    })

    setTimeout(() => {
      window.location.href = "/login"
    }, 1500)
  }

  const handleChangePassword = () => {
    // Aquí iría la lógica para cambiar contraseña
    toast({
      variant: "info",
      title: "Cambio de contraseña",
      description: "Se envió un enlace a tu email para cambiar la contraseña.",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <PfButton variant="ghost" size="icon" onClick={() => window.history.back()}>
                <ArrowLeft className="h-5 w-5" />
              </PfButton>
              <h1 className="text-xl font-semibold text-slate-800">Mi Cuenta</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            <PfCard>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Información del Perfil</h2>
                <PfButton
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  icon={<Edit3 className="h-4 w-4" />}
                >
                  {isEditing ? "Cancelar" : "Editar"}
                </PfButton>
              </div>

              <div className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-800">{user.name}</h3>
                    <p className="text-slate-500">{user.email}</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <PfInput
                    label="Nombre completo"
                    value={isEditing ? editForm.name : user.name}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                    icon={<User className="h-4 w-4" />}
                  />
                  <PfInput
                    label="Correo electrónico"
                    type="email"
                    value={isEditing ? editForm.email : user.email}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                    icon={<Mail className="h-4 w-4" />}
                  />
                </div>

                {isEditing && (
                  <div className="flex space-x-3">
                    <PfButton onClick={handleSaveProfile}>Guardar cambios</PfButton>
                    <PfButton variant="outline" onClick={() => setIsEditing(false)}>
                      Cancelar
                    </PfButton>
                  </div>
                )}
              </div>
            </PfCard>

            {/* Account Details */}
            <PfCard>
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Detalles de la Cuenta</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">Rol</p>
                      <p className="text-sm text-slate-500">{user.role}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">Último acceso</p>
                      <p className="text-sm text-slate-500">{formatDate(user.lastAccess)}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">Miembro desde</p>
                      <p className="text-sm text-slate-500">{formatDate(user.joinDate)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </PfCard>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <PfCard>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Acciones Rápidas</h3>

              <div className="space-y-3">
                <PfButton
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleChangePassword}
                  icon={<Key className="h-4 w-4" />}
                >
                  Cambiar contraseña
                </PfButton>

                <PfButton variant="outline" className="w-full justify-start" icon={<Bell className="h-4 w-4" />}>
                  Notificaciones
                </PfButton>

                <PfButton variant="outline" className="w-full justify-start" icon={<Globe className="h-4 w-4" />}>
                  Idioma y región
                </PfButton>
              </div>
            </PfCard>

            {/* Logout */}
            <PfCard variant="danger">
              <h3 className="text-lg font-semibold text-red-800 mb-4">Zona de Peligro</h3>

              <PfModal>
                <PfModalTrigger asChild>
                  <PfButton variant="danger" className="w-full" icon={<LogOut className="h-4 w-4" />}>
                    Cerrar sesión
                  </PfButton>
                </PfModalTrigger>
                <PfModalContent>
                  <PfModalHeader>
                    <PfModalTitle>¿Cerrar sesión?</PfModalTitle>
                    <PfModalDescription>
                      Estás a punto de cerrar tu sesión en Priceflow. Tendrás que volver a iniciar sesión para acceder a
                      tu cuenta.
                    </PfModalDescription>
                  </PfModalHeader>
                  <PfModalFooter>
                    <PfButton variant="outline">Cancelar</PfButton>
                    <PfButton variant="danger" onClick={handleLogout}>
                      Cerrar sesión
                    </PfButton>
                  </PfModalFooter>
                </PfModalContent>
              </PfModal>
            </PfCard>
          </div>
        </div>
      </div>
    </div>
  )
}
