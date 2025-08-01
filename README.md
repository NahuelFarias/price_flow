# PriceFlow - Gestión Estratégica de Precios y Promociones

## 📋 Descripción del Proyecto

**PriceFlow** es una solución integral diseñada para mayoristas de consumo masivo que necesitan gestionar estratégicamente sus precios y promociones en un contexto de alta inflación. La plataforma permite tomar decisiones basadas en datos, implementar precios dinámicos, gestionar promociones complejas y generar reportes detallados.

### 🎯 Objetivos del Negocio

- **Gestión estratégica de precios** en contexto inflacionario
- **Promociones complejas** con múltiples condiciones y reglas
- **Análisis de datos** para decisiones informadas
- **Reportes detallados** de rendimiento y rentabilidad
- **Recomendaciones automáticas** de precios y promociones
- **Gestión de usuarios** con diferentes roles y permisos

## 🚀 Inicio Rápido

### Prerrequisitos
- **Node.js** 18+ 
- **pnpm** (recomendado) o npm
- **Git**

### 1. Clonar y Configurar

```bash
# Clonar el repositorio
git clone <repository-url>
cd price_flow

# Navegar al frontend
cd front

# Instalar dependencias
pnpm install
# o
npm install

# Levantar en modo desarrollo
pnpm dev
# o
npm run dev
```

### 2. Acceder a la Aplicación

El frontend estará disponible en: **http://localhost:3000**

## 🏗️ Arquitectura del Proyecto

### Frontend (Next.js 15)
- **Next.js 15** con App Router
- **TypeScript** para tipado estático
- **Tailwind CSS** para estilos
- **Radix UI** para componentes accesibles
- **Recharts** para gráficos interactivos

### Backend (ASP.NET Core 8)
- **ASP.NET Core 8** con Entity Framework
- **MySQL** como base de datos
- **Swagger/OpenAPI** para documentación

## 📦 Configuración del Backend (Opcional)

Si necesitas trabajar con la API:

```bash
# Navegar al directorio API
cd ../PriceFlow.Api

# Restaurar dependencias
dotnet restore

# Ejecutar migraciones (si aplica)
dotnet ef database update

# Levantar la API
dotnet run
```

La API estará disponible en: **https://localhost:7001**


## 🎯 Funcionalidades Actuales

### Dashboard (`/`)
- Métricas principales del negocio
- Gráficos interactivos (ventas, márgenes, promociones)
- Alertas y notificaciones
- Acciones rápidas

### Productos (`/productos`)
- Catálogo completo de productos
- Búsqueda y filtros avanzados
- Importación masiva via Excel
- Vista detallada en modal
- Creación individual de productos

### Promociones (`/promociones`)
- Lista de promociones activas
- Filtros por tipo, estado, fecha
- Wizard de creación de promociones
- Gestión de reglas complejas

### Autenticación
- Login (`/login`)
- Gestión de cuenta (`/account`)

## 📚 Recursos Adicionales

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
- [Recharts](https://recharts.org/)

---

**Desarrollado para mayoristas que buscan optimizar sus estrategias de precios y promociones en mercados dinámicos.**