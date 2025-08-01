"use client"

import * as React from "react"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"

import { AppLayout } from "@/components/layout/app-layout"
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

export default function LoginPage() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const { toast, toasts, dismiss } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast({
        variant: "error",
        title: "Campos requeridos",
        description: "Por favor completa todos los campos",
      })
      return
    }

    setIsLoading(true)

    // Simular login
    setTimeout(() => {
      if (email === "admin@priceflow.com" && password === "admin123") {
        toast({
          variant: "success",
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente",
        })
        
        setTimeout(() => {
          window.location.href = "/"
        }, 1000)
      } else {
        toast({
          variant: "error",
          title: "Credenciales incorrectas",
          description: "Verifica tu email y contraseña",
        })
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <AppLayout activeSection="" showSidebar={false}>
      <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo y Título */}
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-slate-900">
              Bienvenido a Priceflow
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Inicia sesión en tu cuenta
            </p>
          </div>

          {/* Formulario */}
          <PfCard>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <PfInput
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <PfInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                    Recordarme
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>

              <div>
                <PfButton
                  type="submit"
                  className="w-full flex justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Iniciando sesión...
                    </>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </PfButton>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">¿No tienes cuenta?</span>
                </div>
              </div>

              <div className="mt-6">
                <PfButton
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    toast({
                      variant: "info",
                      title: "Registro",
                      description: "Funcionalidad de registro en desarrollo",
                    })
                  }}
                >
                  Crear cuenta
                </PfButton>
              </div>
            </div>
          </PfCard>

          {/* Información de Demo */}
          <div className="text-center">
            <p className="text-xs text-slate-500">
              <strong>Demo:</strong> admin@priceflow.com / admin123
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
