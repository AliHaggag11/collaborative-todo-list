import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Collaborative Todo List',
  description: 'A real-time collaborative todo list application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}