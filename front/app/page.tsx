"use client"

import * as React from "react"
import { 
  TrendingUp, 
  BarChart3,
  Users, 
  Target,
  Package,
  DollarSign,
  CheckCircle,
  Star,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Clock,
  Phone,
  Mail,
  MapPin
} from "lucide-react"

import { AppLayout } from "@/components/layout/app-layout"
import { PfButton } from "@/components/ui/pf-button"
import { PfCard } from "@/components/ui/pf-card"

const beneficios = [
  {
    icono: BarChart3,
    titulo: "Análisis Inteligente",
    descripcion: "Optimiza tus precios con análisis en tiempo real del mercado y márgenes de ganancia"
  },
  {
    icono: Target,
    titulo: "Promociones Efectivas",
    descripcion: "Crea y gestiona promociones estratégicas que incrementen tus ventas"
  },
  {
    icono: Package,
    titulo: "Gestión de Inventario",
    descripcion: "Control total de tu stock con alertas automáticas y gestión inteligente"
  },
  {
    icono: DollarSign,
    titulo: "Maximiza Rentabilidad",
    descripcion: "Aumenta tus márgenes de ganancia con insights basados en datos reales"
  },
  {
    icono: Users,
    titulo: "Multi-usuario",
    descripcion: "Colabora con tu equipo con roles y permisos personalizados"
  },
  {
    icono: Shield,
    titulo: "Seguro y Confiable",
    descripcion: "Tus datos protegidos con la más alta seguridad y respaldos automáticos"
  }
]

const caracteristicas = [
  {
    titulo: "Dashboard Ejecutivo",
    descripcion: "Vista 360° de tu negocio con métricas clave y KPIs en tiempo real",
    icono: BarChart3
  },
  {
    titulo: "Gestión de Precios Dinámica",
    descripcion: "Ajusta precios automáticamente según la demanda y competencia",
    icono: TrendingUp
  },
  {
    titulo: "Sistema de Promociones",
    descripcion: "Campañas promocionales inteligentes con seguimiento de ROI",
    icono: Target
  },
  {
    titulo: "Control de Inventario",
    descripcion: "Gestión completa de stock con predicciones de demanda",
    icono: Package
  }
]

const testimonios = [
  {
    nombre: "María González",
    empresa: "Distribuidora Central",
    testimonio: "PriceFlow transformó nuestra operación. Aumentamos márgenes 23% en 3 meses.",
    rating: 5,
    avatar: "MG"
  },
  {
    nombre: "Carlos Rodriguez",
    empresa: "Mayorista Sur",
    testimonio: "La gestión de promociones es excepcional. Ahora vendemos 40% más con menos esfuerzo.",
    rating: 5,
    avatar: "CR"
  },
  {
    nombre: "Ana Martinez",
    empresa: "Comercial Norte",
    testimonio: "El control de inventario nos ahorró miles en productos vencidos. ROI del 300%.",
    rating: 5,
    avatar: "AM"
  }
]

const planes = [
  {
    nombre: "Starter",
    precio: "$49",
    periodo: "/mes",
    descripcion: "Perfecto para pequeños mayoristas",
    caracteristicas: [
      "Hasta 500 productos",
      "2 usuarios",
      "Dashboard básico",
      "Soporte por email",
      "Reportes básicos"
    ],
    popular: false
  },
  {
    nombre: "Professional", 
    precio: "$149",
    periodo: "/mes",
    descripcion: "Ideal para empresas en crecimiento",
    caracteristicas: [
      "Hasta 5,000 productos",
      "10 usuarios",
      "Dashboard avanzado",
      "Soporte prioritario",
      "Reportes avanzados",
      "API incluida",
      "Promociones ilimitadas"
    ],
    popular: true
  },
  {
    nombre: "Enterprise",
    precio: "Personalizado",
    periodo: "",
    descripcion: "Para grandes operaciones",
    caracteristicas: [
      "Productos ilimitados",
      "Usuarios ilimitados",
      "Dashboard personalizado",
      "Soporte 24/7",
      "Reportes personalizados",
      "Integraciones avanzadas",
      "Consultoría incluida"
    ],
    popular: false
  }
]

export default function LandingPage() {
  const handleGetStarted = () => {
    window.location.href = "/login"
  }

  const handleContactSales = () => {
    // Aquí iría la lógica para contactar ventas
    window.location.href = "mailto:ventas@priceflow.com"
  }

  return (
    <AppLayout activeSection="" showSidebar={false} showNavbarSimple={true} noPadding={true}>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Maximiza la <span className="text-blue-400">Rentabilidad</span> 
                <br />de tu Negocio Mayorista
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto">
                La plataforma inteligente que optimiza precios, gestiona inventario y 
                potencia tus promociones para incrementar márgenes de ganancia
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PfButton 
                  size="lg" 
                  onClick={handleGetStarted}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4"
                >
                  Comenzar Prueba Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </PfButton>
                <PfButton 
                  variant="outline" 
                  size="lg"
                  onClick={handleContactSales}
                  className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4"
                >
                  Hablar con Ventas
                </PfButton>
          </div>
              <p className="text-sm text-slate-400 mt-4">
                14 días gratis • No requiere tarjeta de crédito • Configuración en minutos
              </p>
          </div>
        </div>
        </section>

        {/* Beneficios Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                ¿Por qué elegir PriceFlow?
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                La solución integral para mayoristas que buscan optimizar operaciones 
                y maximizar rentabilidad
              </p>
          </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {beneficios.map((beneficio, index) => (
                <PfCard key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <beneficio.icono className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">{beneficio.titulo}</h3>
                  <p className="text-slate-600">{beneficio.descripcion}</p>
                </PfCard>
              ))}
            </div>
        </div>
        </section>

        {/* Características Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Características Principales
            </h2>
              <p className="text-xl text-slate-600">
                Todo lo que necesitas para gestionar tu negocio mayorista
              </p>
          </div>
          
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {caracteristicas.map((caracteristica, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <caracteristica.icono className="h-6 w-6 text-white" />
                    </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {caracteristica.titulo}
                    </h3>
                    <p className="text-slate-600">{caracteristica.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonios Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Lo que dicen nuestros clientes
              </h2>
              <p className="text-xl text-slate-600">
                Mayoristas exitosos confían en PriceFlow
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonios.map((testimonio, index) => (
                <PfCard key={index} className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonio.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-6 italic">"{testimonio.testimonio}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                      {testimonio.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{testimonio.nombre}</p>
                      <p className="text-slate-600 text-sm">{testimonio.empresa}</p>
                    </div>
                  </div>
                </PfCard>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Planes que se adaptan a tu negocio
              </h2>
              <p className="text-xl text-slate-600">
                Empieza gratis y escala según tus necesidades
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {planes.map((plan, index) => (
                <PfCard 
                  key={index} 
                  className={`p-8 relative ${plan.popular ? 'border-blue-500 border-2' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Más Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.nombre}</h3>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-slate-900">{plan.precio}</span>
                      <span className="text-slate-600">{plan.periodo}</span>
                    </div>
                    <p className="text-slate-600">{plan.descripcion}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.caracteristicas.map((caracteristica, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-slate-700">{caracteristica}</span>
                      </li>
                    ))}
                  </ul>

                  <PfButton 
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={plan.nombre === "Enterprise" ? handleContactSales : handleGetStarted}
                  >
                    {plan.nombre === "Enterprise" ? "Contactar Ventas" : "Comenzar Prueba"}
                  </PfButton>
                </PfCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Listo para optimizar tu negocio?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Únete a cientos de mayoristas que ya aumentaron su rentabilidad con PriceFlow
            </p>
            <PfButton 
              size="lg"
              onClick={handleGetStarted}
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4"
            >
              Comenzar Ahora - Es Gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </PfButton>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">Priceflow</span>
                </div>
                <p className="text-slate-400 mb-4 max-w-md">
                  La plataforma líder para la gestión inteligente de precios y promociones 
                  en el sector mayorista.
                </p>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-slate-400" />
                    <span className="text-slate-400">+54 11 4000-0000</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-slate-400" />
                    <span className="text-slate-400">info@priceflow.com</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Producto</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#" className="hover:text-white">Características</a></li>
                  <li><a href="#" className="hover:text-white">Precios</a></li>
                  <li><a href="#" className="hover:text-white">Integraciones</a></li>
                  <li><a href="#" className="hover:text-white">API</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Soporte</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#" className="hover:text-white">Centro de Ayuda</a></li>
                  <li><a href="#" className="hover:text-white">Contacto</a></li>
                  <li><a href="#" className="hover:text-white">Estado del Sistema</a></li>
                  <li><a href="/login" className="hover:text-white">Iniciar Sesión</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-slate-800 mt-8 pt-8 text-center">
              <p className="text-slate-400">
                © 2024 PriceFlow. Todos los derechos reservados.
              </p>
        </div>
          </div>
        </footer>
      </div>
    </AppLayout>
  )
}