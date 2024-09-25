import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useTaskStore } from '../lib/zustand'
import { Task } from '../types'

export const useTasks = () => {
  const queryClient = useQueryClient()
  const { setTasks, addTask, updateTask, deleteTask } = useTaskStore()

  const fetchTasks = async (): Promise<Task[]> => {
    const { data, error } = await supabase.from('tasks').select('*')
    if (error) throw error
    return data
  }

  const { data, isLoading, error }: UseQueryResult<Task[], Error> = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  })

  useEffect(() => {
    if (data) {
      setTasks(data)
    }
  }, [data, setTasks])

  const createTaskMutation = useMutation<Task, Error, Omit<Task, 'id' | 'created_at'>>({
    mutationFn: async (newTask) => {
      const { data, error } = await supabase.from('tasks').insert(newTask).single()
      if (error) throw error
      return data
    },
    onSuccess: (task) => {
      addTask(task)
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const updateTaskMutation = useMutation<Task, Error, Task>({
    mutationFn: async (updatedTask) => {
      const { data, error } = await supabase
        .from('tasks')
        .update(updatedTask)
        .eq('id', updatedTask.id)
        .single()
      if (error) throw error
      return data
    },
    onSuccess: (task) => {
      updateTask(task)
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const deleteTaskMutation = useMutation<void, Error, string>({
    mutationFn: async (taskId) => {
      const { error } = await supabase.from('tasks').delete().eq('id', taskId)
      if (error) throw error
    },
    onSuccess: (_, taskId) => {
      deleteTask(taskId)
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  return {
    tasks: data || [],
    isLoading,
    error,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  }
}