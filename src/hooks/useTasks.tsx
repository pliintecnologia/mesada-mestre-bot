import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from './useAuth'
import { useToast } from './use-toast'

export interface Task {
  id: string
  title: string
  description?: string
  assigned_to?: string
  child_id?: string
  status: 'pending' | 'in_progress' | 'completed'
  points: number
  due_date?: string
  category?: string
  created_at: string
  updated_at: string
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  const fetchTasks = async () => {
    if (!user) return
    
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setTasks((data || []) as Task[])
    } catch (error) {
      console.error('Error fetching tasks:', error)
      toast({
        title: "Erro ao carregar tarefas",
        description: "Não foi possível carregar as tarefas",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ ...taskData, user_id: user.id }])
        .select()
        .single()

      if (error) throw error
      
      setTasks(prev => [data as Task, ...prev])
      toast({
        title: "Tarefa criada com sucesso!",
        description: `A tarefa "${taskData.title}" foi criada`
      })
      
      return data
    } catch (error) {
      console.error('Error creating task:', error)
      toast({
        title: "Erro ao criar tarefa",
        description: "Não foi possível criar a tarefa",
        variant: "destructive"
      })
    }
  }

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', taskId)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error
      
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, ...(data as Task) } : task
      ))
      
      toast({
        title: "Tarefa atualizada!",
        description: "A tarefa foi atualizada com sucesso"
      })
      
      return data
    } catch (error) {
      console.error('Error updating task:', error)
      toast({
        title: "Erro ao atualizar tarefa",
        description: "Não foi possível atualizar a tarefa",
        variant: "destructive"
      })
    }
  }

  const deleteTask = async (taskId: string) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)
        .eq('user_id', user.id)

      if (error) throw error
      
      setTasks(prev => prev.filter(task => task.id !== taskId))
      toast({
        title: "Tarefa excluída!",
        description: "A tarefa foi excluída com sucesso"
      })
    } catch (error) {
      console.error('Error deleting task:', error)
      toast({
        title: "Erro ao excluir tarefa",
        description: "Não foi possível excluir a tarefa",
        variant: "destructive"
      })
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [user])

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks
  }
}