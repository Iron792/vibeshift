import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-center">
      <div className="flex max-w-md flex-col items-center gap-4">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="text-muted-foreground">The page you are looking for does not exist.</p>
        <Link className="text-sm font-medium underline underline-offset-4" href="/">
          Return home
        </Link>
      </div>
    </main>
  )
}
