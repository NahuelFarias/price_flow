"use client"

import * as React from "react"
import { Search } from "lucide-react"

interface FilterOption {
  value: string
  label: string
}

interface FiltersSectionProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  filters: {
    categoria?: FilterOption[]
    marca?: FilterOption[]
    estado?: FilterOption[]
    [key: string]: FilterOption[] | undefined
  }
  filterValues: Record<string, string>
  onFilterChange: (filterName: string, value: string) => void
  className?: string
}

export function FiltersSection({
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Buscar...",
  filters,
  filterValues,
  onFilterChange,
  className = ""
}: FiltersSectionProps) {
  return (
    <div className={`bg-white rounded-lg border border-slate-200 p-6 ${className}`}>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Búsqueda */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filtros */}
        <div className="flex gap-4">
          {Object.entries(filters).map(([filterName, options]) => {
            if (!options) return null
            
            return (
              <select
                key={filterName}
                value={filterValues[filterName] || "todos"}
                onChange={(e) => onFilterChange(filterName, e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todos">Todos los {filterName}</option>
                {options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )
          })}
        </div>
      </div>
    </div>
  )
} 