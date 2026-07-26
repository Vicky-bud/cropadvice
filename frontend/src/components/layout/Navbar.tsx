import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Leaf } from 'lucide-react'
import { ModeToggle } from '../ModeToggle'

export default function Navbar() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-neutral-950/80">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="text-xl font-bold text-green-800 dark:text-green-500">CropAdvice</span>
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-sm font-medium hover:text-green-600 transition-colors">Home</Link>
          <Link to="/about" className="text-sm font-medium hover:text-green-600 transition-colors">About</Link>
          <Link to="/features" className="text-sm font-medium hover:text-green-600 transition-colors">Features</Link>
          <Link to="/faq" className="text-sm font-medium hover:text-green-600 transition-colors">FAQ</Link>
          <Link to="/contact" className="text-sm font-medium hover:text-green-600 transition-colors">Contact</Link>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          {token ? (
            <Button onClick={() => navigate('/dashboard')} className="bg-green-600 hover:bg-green-700 text-white">
              Go to Dashboard
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-sm font-medium">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
