"use client"

import * as React from "react"
import { Check, PlusCircle } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DataTableFacetedFilterProps {
  title?: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
  filterKey: string // The URL parameter key (e.g., 'status', 'priority')
}

export function DataTableFacetedFilter({
  title,
  options,
  filterKey,
}: DataTableFacetedFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get current filter values from URL
  const currentFilterValues = searchParams.getAll(filterKey)
  const selectedValues = new Set(currentFilterValues)

  // Create URL with new search params
  const createQueryString = useCallback(
    (newFilterValues: string[]) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      
      // Remove existing filter values
      newSearchParams.delete(filterKey)
      
      // Add new filter values
      newFilterValues.forEach(value => {
        newSearchParams.append(filterKey, value)
      })
      
      return newSearchParams.toString()
    },
    [searchParams, filterKey]
  )

  // Handle filter selection
  const handleFilterChange = (value: string, isSelected: boolean) => {
    const newSelectedValues = new Set(selectedValues)
    
    if (isSelected) {
      newSelectedValues.delete(value)
    } else {
      newSelectedValues.add(value)
    }
    
    const filterValues = Array.from(newSelectedValues)
    const queryString = createQueryString(filterValues)
    router.push(`?${queryString}`)
  }

  // Handle clear filters
  const handleClearFilters = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.delete(filterKey)
    router.push(`?${newSearchParams.toString()}`)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size <= 3 ? (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                ) : (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleFilterChange(option.value, isSelected)}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={handleClearFilters}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 