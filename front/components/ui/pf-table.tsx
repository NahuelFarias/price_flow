"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react"

import { cn } from "@/lib/utils"
import { PfButton } from "./pf-button"
import { PfInput } from "./pf-input"

interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: any, row: T) => React.ReactNode
}

interface PfTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchable?: boolean
  filterable?: boolean
  pagination?: boolean
  pageSize?: number
  className?: string
  onRowClick?: (row: T) => void
}

export function PfTable<T extends Record<string, any>>({
  data,
  columns,
  searchable = false,
  filterable = false,
  pagination = false,
  pageSize = 10,
  className,
  onRowClick,
}: PfTableProps<T>) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof T
    direction: "asc" | "desc"
  } | null>(null)
  const [currentPage, setCurrentPage] = React.useState(1)

  // Filter data based on search term
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data

    return data.filter((row) =>
      Object.values(row).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }, [data, searchTerm])

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1
      }
      return 0
    })
  }, [filteredData, sortConfig])

  // Paginate data
  const paginatedData = React.useMemo(() => {
    if (!pagination) return sortedData

    const startIndex = (currentPage - 1) * pageSize
    return sortedData.slice(startIndex, startIndex + pageSize)
  }, [sortedData, currentPage, pageSize, pagination])

  const totalPages = Math.ceil(sortedData.length / pageSize)

  const handleSort = (key: keyof T) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === "asc" ? "desc" : "asc",
        }
      }
      return { key, direction: "asc" }
    })
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search and Filter Bar */}
      {(searchable || filterable) && (
        <div className="flex items-center justify-between gap-4">
          {searchable && (
            <div className="flex-1 max-w-sm">
              <PfInput
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
          )}
          {filterable && (
            <PfButton variant="outline" icon={<Filter className="h-4 w-4" />}>
              Filtros
            </PfButton>
          )}
        </div>
      )}

      {/* Table */}
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider",
                    column.sortable && "cursor-pointer hover:bg-slate-100",
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && sortConfig?.key === column.key && (
                      <span className="text-slate-400">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {paginatedData.map((row, index) => (
              <tr
                key={index}
                className={cn("hover:bg-slate-50 transition-colors", onRowClick && "cursor-pointer")}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {column.render ? column.render(row[column.key], row) : String(row[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {paginatedData.length === 0 && (
          <div className="text-center py-8 text-slate-500">No se encontraron resultados</div>
        )}
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-500">
            Mostrando {(currentPage - 1) * pageSize + 1} a {Math.min(currentPage * pageSize, sortedData.length)} de{" "}
            {sortedData.length} resultados
          </div>
          <div className="flex items-center space-x-2">
            <PfButton
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              icon={<ChevronLeft className="h-4 w-4" />}
            >
              Anterior
            </PfButton>
            <span className="text-sm text-slate-600">
              Página {currentPage} de {totalPages}
            </span>
            <PfButton
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              icon={<ChevronRight className="h-4 w-4" />}
            >
              Siguiente
            </PfButton>
          </div>
        </div>
      )}
    </div>
  )
}
