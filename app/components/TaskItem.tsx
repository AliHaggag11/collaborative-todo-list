'use client'

import { Task } from '../types'
import { useTasks } from '../hooks/useTasks'

interface TaskItemProps {
  task: Task
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { updateTask, deleteTask } = useTasks()

  return (
    <li className="flex items-center justify-between p-2 border-b">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => updateTask({ ...task, completed: !task.completed })}
          className="mr-2"
        />
        <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
    </li>
  )
}