"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Skeleton } from "@/components/ui/skeleton"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { Task, ApiRequest, ApiResponse } from "./data/schema"
import { mockTaskApiService } from "./lib/api-service"

export default function ServerDataPage() {
  const searchParams = useSearchParams()
  const [data, setData] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    pageSize: 10,
  })

  // Parse search params to create API request
  const parseSearchParams = (): ApiRequest => {
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const sortBy = (searchParams.get('sortBy') as 'id' | 'title' | 'status' | 'priority' | 'label') || 'id'
    const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc'
    const search = searchParams.get('search') || undefined
    const status = searchParams.getAll('status').length > 0 ? searchParams.getAll('status') : undefined
    const priority = searchParams.getAll('priority').length > 0 ? searchParams.getAll('priority') : undefined
    const label = searchParams.getAll('label').length > 0 ? searchParams.getAll('label') : undefined

    return {
      page,
      pageSize,
      sortBy,
      sortOrder,
      search,
      status,
      priority,
      label,
    }
  }

  // Fetch data from API
  const fetchData = async (params: ApiRequest) => {
    try {
      setLoading(true)
      setError(null)
      
      // Use mock service for now - replace with real API service when available
      const response: ApiResponse = await mockTaskApiService.fetchTasks(params)
      
      setData(response.data)
      setPagination({
        currentPage: response.pagination.currentPage,
        totalPages: response.pagination.totalPages,
        totalCount: response.pagination.totalCount,
        pageSize: response.pagination.pageSize,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch data when search params change
  useEffect(() => {
    const params = parseSearchParams()
    fetchData(params)
  }, [searchParams])

  if (error) {
    return (
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Error</h2>
            <p className="text-muted-foreground">
              {error}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Server Data Tasks</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks with server-side filtering and pagination!
          </p>
        </div>
        <Link href="/server-data/edit/0">
          <Button>New Task</Button>
        </Link>
      </div>
      
      {loading ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-8 w-[100px]" />
          </div>
          <div className="rounded-md border">
            <div className="p-4">
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      ) : (
        <DataTable 
          data={data} 
          columns={columns}
          totalPages={pagination.totalPages}
          totalCount={pagination.totalCount}
          currentPage={pagination.currentPage}
          pageSize={pagination.pageSize}
        />
      )}
    </div>
  )
}
