'use client'

import React, { useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import { useAuth } from '../hooks/useAuth'
import { User } from '../types'

export const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('')
  const { createTask } = useTasks()
  const { user } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() && user) {
      createTask({ title, completed: false, user_id: (user as User).id })
      setTitle('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  )
}