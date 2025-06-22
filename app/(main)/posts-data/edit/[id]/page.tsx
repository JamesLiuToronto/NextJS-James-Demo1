"use client"

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { taskSchema, Task } from '../../data/schema'
import { fetchTasksAction, createTaskAction, updateTaskAction } from '../../components/task-actions'
import { labels, statuses, priorities } from '../../data/data'
import { Button } from '@/components/ui/button'
import BackButton from '@/components/BackButton'
import { v4 as uuidv4 } from 'uuid'

interface EditTaskPageProps {
  params: Promise<{ id: string }>
}

const EditTaskPage = ({ params }: EditTaskPageProps) => {
  const { id } = use(params)
  const router = useRouter()
  const [task, setTask] = useState<Task | null>(null)
  const [error, setError] = useState('')

  const form = useForm<Task>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      id: '',
      title: '',
      status: '',
      label: '',
      priority: '',
    },
  })

  useEffect(() => {
    if (id === '0') {
      setTask({ id: '', title: '', status: '', label: '', priority: '' })
      form.reset({ id: '', title: '', status: '', label: '', priority: '' })
      return
    }
    const fetchTask = async () => {
      try {
        const tasks = await fetchTasksAction()
        const found = tasks.find(t => t.id === id)
        if (found) {
          setTask(found)
          form.reset(found)
        } else {
          setError('Task not found')
        }
      } catch {
        setError('Failed to fetch task')
      }
    }
    fetchTask()
  }, [id, form])

  const onSubmit = async (data: Task) => {
    try {
      if (id === '0') {
        // Assign a new id using uuid
        const newTask = { ...data, id: 'TASK-' + uuidv4() }
        await createTaskAction(newTask)
      } else {
        await updateTaskAction({ ...data, id })
      }
      router.push('/posts-data')
    } catch {
      setError('Failed to save task')
    }
  }

  if (error) return <div className='text-red-500'>{error}</div>
  if (!task) return <div>Loading...</div>

  return (
    <>
      <BackButton text='Back to Task List' link='/posts-data' />
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 max-w-md mx-auto mt-8'>
        <div>
          <label className='block mb-1'>Title</label>
          <input {...form.register('title')} className='border p-2 w-full' />
        </div>
        <div>
          <label className='block mb-1'>Status</label>
          <select {...form.register('status')} className='border p-2 w-full'>
            {statuses.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
        <div>
          <label className='block mb-1'>Label</label>
          <select {...form.register('label')} className='border p-2 w-full'>
            {labels.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        </div>
        <div>
          <label className='block mb-1'>Priority</label>
          <select {...form.register('priority')} className='border p-2 w-full'>
            {priorities.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
        </div>
        <Button type='submit'>{id === '0' ? 'Create Task' : 'Update Task'}</Button>
      </form>
    </>
  )
}

export default EditTaskPage
