import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Features from './pages/Features'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import ScrollToTop from './components/ScrollToTop'

import DashboardLayout from './components/layout/DashboardLayout'
import DashboardOverview from './pages/dashboard/DashboardOverview'
import CropRecommendation from './pages/dashboard/CropRecommendation'
import DiseaseDetection from './pages/dashboard/DiseaseDetection'

import AIAssistant from './pages/dashboard/AIAssistant'
import { ThemeProvider } from './components/ThemeProvider'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/auth/ProtectedRoute'
import PublicRoute from './components/auth/PublicRoute'

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-zinc-950 text-neutral-900 dark:text-zinc-50">
      <ScrollToTop />
      <Routes>
            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route index element={<DashboardOverview />} />
                <Route path="crop-recommendation" element={<CropRecommendation />} />
                <Route path="disease-detection" element={<DiseaseDetection />} />
                <Route path="ai-assistant" element={<AIAssistant />} />
              </Route>
            </Route>
            <Route path="/*" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route element={<PublicRoute />}>
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                    </Route>
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
      </Routes>
    </div>
  )
}

export default App
