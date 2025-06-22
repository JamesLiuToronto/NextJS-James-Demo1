import { ApiRequest, ApiResponse, Task } from "../data/schema"
import { mockTasks } from "../data/data"

// Configuration for API endpoint
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api'

// API Service class for handling external API calls
export class TaskApiService {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  // Fetch tasks with server-side filtering, sorting, and pagination
  async fetchTasks(params: ApiRequest): Promise<ApiResponse> {
    try {
      const queryParams = new URLSearchParams()

      // Add pagination parameters
      queryParams.append('page', params.page.toString())
      queryParams.append('pageSize', params.pageSize.toString())

      // Add sorting parameters
      queryParams.append('sortBy', params.sortBy)
      queryParams.append('sortOrder', params.sortOrder)

      // Add search parameter
      if (params.search) {
        queryParams.append('search', params.search)
      }

      // Add filter parameters
      if (params.status && params.status.length > 0) {
        params.status.forEach(status => queryParams.append('status', status))
      }

      if (params.priority && params.priority.length > 0) {
        params.priority.forEach(priority => queryParams.append('priority', priority))
      }

      if (params.label && params.label.length > 0) {
        params.label.forEach(label => queryParams.append('label', label))
      }

      const url = `${this.baseUrl}/tasks?${queryParams.toString()}`
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // No caching - always fetch fresh data
        cache: 'no-store',
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`)
      } else {
        console.log('API server datar retrieve successful')
      }

      const data = await response.json()
      return data as ApiResponse
    } catch (error) {
      console.error('Error fetching tasks:', error)
      throw error
    }
  }

  // Create a new task
  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    try {
      const response = await fetch(`${this.baseUrl}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      })

      if (!response.ok) {
        throw new Error(`Failed to create task: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating task:', error)
      throw error
    }
  }

  // Update an existing task
  async updateTask(id: string, task: Partial<Task>): Promise<Task> {
    try {
      const response = await fetch(`${this.baseUrl}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      })

      if (!response.ok) {
        throw new Error(`Failed to update task: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating task:', error)
      throw error
    }
  }

  // Delete a task
  async deleteTask(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/tasks/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`Failed to delete task: ${response.status}`)
      }
    } catch (error) {
      console.error('Error deleting task:', error)
      throw error
    }
  }

  // Get task by ID
  async getTaskById(id: string): Promise<Task> {
    try {
      const response = await fetch(`${this.baseUrl}/tasks/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to get task: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error getting task:', error)
      throw error
    }
  }
}

// Export singleton instance
export const taskApiService = new TaskApiService()

// Mock API service for development (when external API is not available)
export class MockTaskApiService {
  private tasks: Task[]

  constructor() {
    // Use imported mock data
    this.tasks = mockTasks
  }

  async fetchTasks(params: ApiRequest): Promise<ApiResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    let filteredTasks = [...this.tasks]

    // Apply search filter
    if (params.search) {
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(params.search!.toLowerCase())
      )
    }

    // Apply status filter
    if (params.status && params.status.length > 0) {
      filteredTasks = filteredTasks.filter(task =>
        params.status!.includes(task.status)
      )
    }

    // Apply priority filter
    if (params.priority && params.priority.length > 0) {
      filteredTasks = filteredTasks.filter(task =>
        params.priority!.includes(task.priority)
      )
    }

    // Apply label filter
    if (params.label && params.label.length > 0) {
      filteredTasks = filteredTasks.filter(task =>
        params.label!.includes(task.label)
      )
    }

    // Apply sorting
    filteredTasks.sort((a, b) => {
      const aValue = a[params.sortBy as keyof Task]
      const bValue = b[params.sortBy as keyof Task]
      
      if (params.sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    console.log('Mock API server data retrieved successfully')
    console.log('params=', params)
    console.log('filteredTasks=', filteredTasks)

    // Apply pagination
    const totalCount = filteredTasks.length
    const totalPages = Math.ceil(totalCount / params.pageSize)
    const startIndex = (params.page - 1) * params.pageSize
    const endIndex = startIndex + params.pageSize
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex)

    return {
      data: paginatedTasks,
      pagination: {
        currentPage: params.page,
        totalPages,
        totalCount,
        pageSize: params.pageSize,
      },
      filters: {
        appliedFilters: {
          search: params.search,
          status: params.status,
          priority: params.priority,
          label: params.label,
        },
      },
    }
  }

  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    const newTask: Task = {
      ...task,
      id: `TASK-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
    }
    this.tasks.push(newTask)
    return newTask
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const index = this.tasks.findIndex(task => task.id === id)
    if (index === -1) {
      throw new Error('Task not found')
    }
    this.tasks[index] = { ...this.tasks[index], ...updates }
    return this.tasks[index]
  }

  async deleteTask(id: string): Promise<void> {
    const index = this.tasks.findIndex(task => task.id === id)
    if (index === -1) {
      throw new Error('Task not found')
    }
    this.tasks.splice(index, 1)
  }

  async getTaskById(id: string): Promise<Task> {
    const task = this.tasks.find(task => task.id === id)
    if (!task) {
      throw new Error('Task not found')
    }
    return task
  }
}

// Export mock service for development
export const mockTaskApiService = new MockTaskApiService() 