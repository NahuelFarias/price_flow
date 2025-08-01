"use client"

import React from "react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface PfChartProps {
  type: "line" | "area" | "bar" | "pie"
  data: any[]
  title?: string
  height?: number
  className?: string
  formatValue?: (value: number) => string
}

const COLORS = {
  primary: "#3b82f6", // blue-500
  secondary: "#10b981", // emerald-500
  accent: "#f59e0b", // amber-500
  danger: "#ef4444", // red-500
  success: "#22c55e", // green-500
  purple: "#8b5cf6", // violet-500
}

// Función para formatear valores de ventas
const formatSales = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`
  }
  return `$${value.toLocaleString()}`
}

// Función para formatear porcentajes
const formatPercentage = (value: number) => `${value}%`

// Tooltip personalizado
const CustomTooltip = ({ active, payload, label, formatValue }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
        <p className="font-medium text-slate-800">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${formatValue ? formatValue(entry.value) : entry.value}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function PfChart({ type, data, title, height = 300, className, formatValue }: PfChartProps) {
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickFormatter={formatValue || ((value) => value.toLocaleString())}
            />
            <Tooltip content={<CustomTooltip formatValue={formatValue} />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={COLORS.primary} 
              strokeWidth={3}
              dot={{ fill: COLORS.primary, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: COLORS.primary, strokeWidth: 2, fill: COLORS.primary }}
            />
          </LineChart>
        )
      
      case "area":
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickFormatter={formatValue || ((value) => value.toLocaleString())}
            />
            <Tooltip content={<CustomTooltip formatValue={formatValue} />} />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="value" 
              fill={COLORS.primary} 
              fillOpacity={0.3} 
              stroke={COLORS.primary}
              strokeWidth={2}
            />
          </AreaChart>
        )
      
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickFormatter={formatValue || ((value) => value.toLocaleString())}
            />
            <Tooltip content={<CustomTooltip formatValue={formatValue} />} />
            <Legend />
            <Bar 
              dataKey="value" 
              fill={COLORS.primary}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        )
      
      case "pie":
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={Object.values(COLORS)[index % Object.values(COLORS).length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip formatValue={formatValue} />} />
            <Legend />
          </PieChart>
        )
      
      default:
        return null
    }
  }

  return (
    <div className={`bg-white rounded-lg border border-slate-200 p-4 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  )
}

// Componentes específicos para diferentes tipos de datos
export function SalesChart({ data }: { data: any[] }) {
  return (
    <PfChart
      type="line"
      data={data}
      title="Tendencia de Ventas"
      height={250}
      formatValue={formatSales}
    />
  )
}

export function MarginsChart({ data }: { data: any[] }) {
  return (
    <PfChart
      type="bar"
      data={data}
      title="Márgenes por Categoría"
      height={250}
      formatValue={formatPercentage}
    />
  )
}

export function PromotionsChart({ data }: { data: any[] }) {
  return (
    <PfChart
      type="area"
      data={data}
      title="Rendimiento de Promociones"
      height={250}
      formatValue={formatPercentage}
    />
  )
}

export function CategoryDistributionChart({ data }: { data: any[] }) {
  return (
    <PfChart
      type="pie"
      data={data}
      title="Distribución por Categoría"
      height={250}
      formatValue={formatPercentage}
    />
  )
} 