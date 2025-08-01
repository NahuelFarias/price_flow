"use client"

import * as React from "react"
import { PfCard } from "@/components/ui/pf-card"

interface MetricItem {
  titulo: string
  valor: string
  descripcion: string
  color: string
  icono: React.ComponentType<{ className?: string }>
  colorIcono: string
}

interface MetricsGridProps {
  metrics: MetricItem[]
  className?: string
}

export function MetricsGrid({ metrics, className = "" }: MetricsGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {metrics.map((metrica, index) => {
        const Icon = metrica.icono
        return (
          <PfCard
            key={index}
            icon={<Icon className={`h-5 w-5 ${metrica.colorIcono}`} />}
            title={metrica.titulo}
            value={metrica.valor}
            description={metrica.descripcion}
            color={metrica.color}
          />
        )
      })}
    </div>
  )
} 