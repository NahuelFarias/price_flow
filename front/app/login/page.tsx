"use client"

import * as React from "react"
import { Eye, EyeOff, Lock, Mail, Github } from "lucide-react"

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
  const [showDirectLogin, setShowDirectLogin] = React.useState(false)
  const { toast, toasts, dismiss } = useToast()

  // Auth0 Login Functions
  const handleAuth0Login = () => {
    setIsLoading(true)
    // TODO: Integrar con Auth0 SDK
    toast({
      variant: "info",
      title: "Redirigiendo a Auth0",
      description: "Serás redirigido al proveedor de autenticación",
    })
    
    // Simulación de redirección a Auth0
    setTimeout(() => {
      // window.location.href = process.env.NEXT_PUBLIC_AUTH0_LOGIN_URL
      toast({
        variant: "success", 
        title: "Auth0 configurado",
        description: "Integración pendiente - usa login directo por ahora",
      })
      setIsLoading(false)
    }, 2000)
  }

  const handleGoogleLogin = () => {
    setIsLoading(true)
    // TODO: Integrar con Google via Auth0
    toast({
      variant: "info",
      title: "Login con Google",
      description: "Integración con Google pendiente",
    })
    setTimeout(() => setIsLoading(false), 1500)
  }

  const handleGithubLogin = () => {
    setIsLoading(true)
    // TODO: Integrar con GitHub via Auth0
    toast({
      variant: "info", 
      title: "Login con GitHub",
      description: "Integración con GitHub pendiente",
    })
    setTimeout(() => setIsLoading(false), 1500)
  }

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
    <AppLayout activeSection="" showSidebar={false} showNavbarSimple={true}>
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

          {/* Opciones de Login */}
          <PfCard>
            {!showDirectLogin ? (
              <div className="space-y-6">
                {/* Auth0 Universal Login */}
                <div className="space-y-4">
                  <PfButton
                    type="button"
                    onClick={handleAuth0Login}
                    loading={isLoading}
                    className="w-full"
                    size="lg"
                  >
                    Iniciar sesión con Auth0
                  </PfButton>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-slate-500">O continúa con</span>
                    </div>
                  </div>

                  {/* Proveedores Sociales */}
                  <div className="grid grid-cols-2 gap-3">
                    <PfButton
                      type="button"
                      variant="outline"
                      onClick={handleGoogleLogin}
                      disabled={isLoading}
                      className="flex items-center justify-center space-x-2"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span>Google</span>
                    </PfButton>
                    
                    <PfButton
                      type="button"
                      variant="outline"
                      onClick={handleGithubLogin}
                      disabled={isLoading}
                      className="flex items-center justify-center space-x-2"
                    >
                      <Github className="w-5 h-5" />
                      <span>GitHub</span>
                    </PfButton>
                  </div>
                </div>

                {/* Toggle para Login Directo */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowDirectLogin(true)}
                    className="text-sm text-slate-600 hover:text-slate-800 underline"
                  >
                    ¿Desarrollador? Usar login directo
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Header para Login Directo */}
                <div className="text-center pb-4 border-b border-slate-200">
                  <h3 className="text-lg font-medium text-slate-800">Login Directo</h3>
                  <p className="text-sm text-slate-600">Solo para desarrollo y administradores</p>
                </div>

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

                {/* Volver a Auth0 */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowDirectLogin(false)}
                    className="text-sm text-slate-600 hover:text-slate-800 underline"
                  >
                    ← Volver a opciones de login
                  </button>
                </div>
              </div>
            )}
          </PfCard>

          {/* Información de Demo */}
          {showDirectLogin && (
            <div className="text-center">
              <p className="text-xs text-slate-500">
                <strong>Demo:</strong> admin@priceflow.com / admin123
              </p>
            </div>
          )}

          {/* Información Auth0 */}
          {!showDirectLogin && (
            <div className="text-center">
              <p className="text-xs text-slate-500">
                Autenticación segura powered by <strong>Auth0</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
