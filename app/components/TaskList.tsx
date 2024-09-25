'use client'

import { useTasks } from '../hooks/useTasks'
import { TaskItem } from './TaskItem'
import { Task } from '../types'

export const TaskList: React.FC = () => {
  const { tasks, isLoading, error } = useTasks()

  if (isLoading) return <div>Loading tasks...</div>
  if (error) return <div>Error loading tasks</div>

  return (
    <ul className="space-y-2">
      {tasks.map((task: Task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}