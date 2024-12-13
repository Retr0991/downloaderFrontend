import { UrlChapterForm } from '@/components/url-chapter-form'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <UrlChapterForm />
    </main>
  )
}