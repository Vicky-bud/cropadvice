import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { LayoutDashboard, Sprout, ShieldAlert, Bot, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ModeToggle } from "../ModeToggle"

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Crop Recommendation", href: "/dashboard/crop-recommendation", icon: Sprout },
  { name: "Disease Detection", href: "/dashboard/disease-detection", icon: ShieldAlert },
  { name: "AI Assistant", href: "/dashboard/ai-assistant", icon: Bot },
]

export default function DashboardLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-100 dark:bg-neutral-900">
      {/* Sidebar for Desktop */}
      <aside className="hidden w-64 flex-col border-r bg-white dark:bg-neutral-950 md:flex">
        <div className="flex h-16 items-center px-6 border-b">
          <Sprout className="h-6 w-6 text-green-600 mr-2" />
          <span className="text-xl font-bold text-green-800 dark:text-green-500">CropAdvice</span>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-4">
            {sidebarLinks.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-green-100 text-green-900 dark:bg-green-900/20 dark:text-green-400"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? "text-green-600 dark:text-green-500" : "text-neutral-400"}`} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="border-t p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between px-2 py-2">
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Theme</span>
            <ModeToggle />
          </div>
          <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950" onClick={handleLogout}>
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="flex h-16 flex-shrink-0 items-center justify-between border-b bg-white px-4 md:hidden dark:bg-neutral-950">
          <div className="flex items-center">
            <Sprout className="h-6 w-6 text-green-600 mr-2" />
            <span className="text-xl font-bold text-green-800 dark:text-green-500">CropAdvice</span>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(!isMobileOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </header>

        {/* Mobile Navigation Menu */}
        {isMobileOpen && (
          <div className="md:hidden border-b bg-white dark:bg-neutral-950">
            <nav className="space-y-1 px-2 pb-3 pt-2">
              {sidebarLinks.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center rounded-md px-3 py-2 text-base font-medium ${
                      isActive
                        ? "bg-green-100 text-green-900 dark:bg-green-900/20 dark:text-green-400"
                        : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                )
              })}
              <Button variant="ghost" className="w-full justify-start text-red-600" onClick={handleLogout}>
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </Button>
            </nav>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
