export interface Task {
    id: string
    user_id: string
    title: string
    completed: boolean
    created_at: string
  }
  
  export interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
  }