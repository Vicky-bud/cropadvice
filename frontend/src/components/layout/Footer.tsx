import { Link } from 'react-router-dom'
import { Leaf, Mail, Globe, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-neutral-950 py-12 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold text-green-800 dark:text-green-500">CropAdvice</span>
          </Link>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Empowering farmers with AI-driven insights for smarter, more profitable agriculture.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="flex flex-col gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <li><Link to="/about" className="hover:text-green-600 transition-colors">About Us</Link></li>
            <li><Link to="/features" className="hover:text-green-600 transition-colors">Features</Link></li>
            <li><Link to="/faq" className="hover:text-green-600 transition-colors">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-green-600 transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="flex flex-col gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <li><Link to="/privacy" className="hover:text-green-600 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-green-600 transition-colors">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Connect With Us</h4>
          <div className="flex items-center gap-4">
            <a href="#" className="text-neutral-500 hover:text-green-600 transition-colors">
              <Globe className="h-5 w-5" />
            </a>
            <a href="#" className="text-neutral-500 hover:text-green-600 transition-colors">
              <MessageCircle className="h-5 w-5" />
            </a>
            <a href="#" className="text-neutral-500 hover:text-green-600 transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t text-center text-sm text-neutral-500">
        &copy; {new Date().getFullYear()} CropAdvice. Satyendra Nath Bose Summer Internship Project.
      </div>
    </footer>
  )
}
