import { Link } from "react-router-dom"
import { Home, Sprout } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-neutral-950 p-4 text-center">
      <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-8">
        <Sprout className="w-12 h-12 text-green-600 dark:text-green-500" />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-[600px] mb-8">
        Oops! Looks like you've wandered too far into the fields. The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button className="h-12 px-8 bg-green-600 hover:bg-green-700 text-white rounded-full text-lg">
          <Home className="w-5 h-5 mr-2" />
          Return Home
        </Button>
      </Link>
    </div>
  )
}
