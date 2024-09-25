import { AuthButton } from './components/AuthButton'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { AuthWrapper } from './components/AuthWrapper'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Collaborative Todo List</h1>
      <AuthButton />
      <AuthWrapper>
        <TaskForm />
        <TaskList />
      </AuthWrapper>
    </div>
  )
}