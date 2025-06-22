"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { priorities, statuses } from "../data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { DataTableViewOptions } from "./data-table-view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Local state for search input
  const [searchValue, setSearchValue] = useState("")

  // Check if any filters are applied
  const isFiltered = 
    searchParams.get('search') || 
    searchParams.getAll('status').length > 0 || 
    searchParams.getAll('priority').length > 0 || 
    searchParams.getAll('label').length > 0

  // Initialize search value from URL params
  useEffect(() => {
    const currentSearch = searchParams.get('search') || ""
    setSearchValue(currentSearch)
  }, [searchParams])

  // Create URL with new search params
  const createQueryString = useCallback(
    (params: Record<string, string | number | boolean | undefined>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      
      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      })
      
      return newSearchParams.toString()
    },
    [searchParams]
  )

  // Handle search input change (local state only)
  const handleSearchChange = (value: string) => {
    setSearchValue(value)
  }

  // Handle search on Enter key press
  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const queryString = createQueryString({ search: searchValue || undefined })
      router.push(`?${queryString}`)
    }
  }

  // Handle filter reset
  const handleResetFilters = () => {
    setSearchValue("")
    const queryString = createQueryString({
      search: undefined,
      status: undefined,
      priority: undefined,
      label: undefined,
    })
    router.push(`?${queryString}`)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks... (Press Enter to search)"
          value={searchValue}
          onChange={(event) => handleSearchChange(event.target.value)}
          onKeyDown={handleSearchKeyDown}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <DataTableFacetedFilter
          title="Status"
          options={statuses}
          filterKey="status"
        />
        <DataTableFacetedFilter
          title="Priority"
          options={priorities}
          filterKey="priority"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleResetFilters}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
} 