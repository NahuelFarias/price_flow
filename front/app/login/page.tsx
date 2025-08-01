"use client"

import * as React from "react"
import { TrendingUp, ArrowRight, Mail, HelpCircle } from "lucide-react"

import { PfButton } from "@/components/ui/pf-button"
import { PfCard } from "@/components/ui/pf-card"

export default function LoginPage() {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleAuth0Login = async () => {
    setIsLoading(true)

    // Simular integración con Auth0
    try {
      // Aquí iría la integración real con Auth0
      // window.location.href = '/api/auth/login'

      // Simulación de delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirigir al dashboard después del login exitoso
      window.location.href = "/dashboard"
    } catch (error) {
      console.error("Error en login:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleContactSupport = () => {
    // Aquí iría la lógica para contactar soporte
    window.open("mailto:soporte@priceflow.com?subject=Consulta sobre cuenta", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <div className="relative w-full max-w-md">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800 rounded-2xl mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Priceflow</h1>
          <p className="text-slate-600">Plataforma de gestión de precios para mayoristas</p>
        </div>

        {/* Login Card */}
        <PfCard className="p-8">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">Ingresá a tu cuenta</h2>
              <p className="text-slate-600 text-sm">Accedé a tu dashboard y optimizá tu rentabilidad</p>
            </div>

            {/* Auth0 Login Button */}
            <PfButton
              className="w-full"
              size="lg"
              loading={isLoading}
              onClick={handleAuth0Login}
              icon={!isLoading && <ArrowRight className="h-5 w-5" />}
            >
              {isLoading ? "Iniciando sesión..." : "Continuar con Auth0"}
            </PfButton>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">o</span>
              </div>
            </div>

            {/* Alternative Options */}
            <div className="space-y-3">
              <PfButton
                variant="outline"
                className="w-full"
                onClick={handleContactSupport}
                icon={<Mail className="h-4 w-4" />}
              >
                Contactar por email
              </PfButton>

              <PfButton
                variant="ghost"
                className="w-full text-slate-600"
                onClick={handleContactSupport}
                icon={<HelpCircle className="h-4 w-4" />}
              >
                ¿No tenés cuenta? Consultanos
              </PfButton>
            </div>
          </div>
        </PfCard>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-slate-500">
          <p>
            Al iniciar sesión, aceptás nuestros{" "}
            <a href="#" className="text-slate-700 hover:underline">
              Términos de Servicio
            </a>{" "}
            y{" "}
            <a href="#" className="text-slate-700 hover:underline">
              Política de Privacidad
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
