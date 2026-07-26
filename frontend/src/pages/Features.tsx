import { Sprout, ShieldAlert, Bot, CloudSun, LayoutDashboard, History, CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"

export default function Features() {
  return (
    <div className="flex flex-col w-full bg-transparent transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative w-full py-24 bg-neutral-50 dark:bg-zinc-900 border-b border-neutral-200 dark:border-zinc-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-zinc-50 mb-6">
              Agricultural Intelligence, <br className="hidden md:block"/> Unlocked.
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 dark:text-zinc-400 mb-8 leading-relaxed">
              Discover the suite of machine-learning tools designed to optimize your farm's productivity, from seed selection to harvest.
            </p>
            <Link to="/register">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-green-500/20 active:scale-95 transition-all">
                GET STARTED FREE
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature 1: Crop Recommendation */}
      <section className="py-24 px-4 md:px-6 border-b border-neutral-200 dark:border-zinc-800">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-transparent rounded-3xl -rotate-3 scale-105 blur-lg"></div>
            <div className="relative bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl dark:shadow-none">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-neutral-100 dark:border-zinc-800">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-zinc-50">Soil Analysis Complete</h4>
                  <p className="text-sm text-neutral-500 dark:text-zinc-400">N: 104 | P: 18 | K: 30 | pH: 6.5</p>
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-500/10 rounded-2xl p-6 border border-green-200 dark:border-green-500/20">
                <p className="text-sm text-green-800 dark:text-green-400 font-semibold mb-2 uppercase tracking-wider">Top Recommendation</p>
                <div className="text-4xl font-extrabold text-green-900 dark:text-green-300">Coffee</div>
                <p className="text-sm text-green-700 dark:text-green-500 mt-2">Predicted Yield: High (94% confidence)</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-zinc-50 mb-6">Crop Recommendation Engine</h2>
            <p className="text-lg text-neutral-600 dark:text-zinc-400 mb-8 leading-relaxed">
              Don't guess what to plant. Input your soil metrics (N, P, K, pH) and local climate data, and our Random Forest model will instantly calculate the most profitable crop for your exact acreage.
            </p>
            <ul className="space-y-4">
              {["Supports 22+ crop varieties", "95% accuracy rate", "Accounts for rainfall and temperature"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-neutral-700 dark:text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Feature 2: Disease Detection */}
      <section className="py-24 px-4 md:px-6 bg-neutral-50 dark:bg-zinc-900/30 border-b border-neutral-200 dark:border-zinc-800">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-zinc-50 mb-6">Instant Pathogen Detection</h2>
            <p className="text-lg text-neutral-600 dark:text-zinc-400 mb-8 leading-relaxed">
              Catch diseases before they devastate your harvest. Simply snap a picture of a suspicious leaf, and our computer vision model will identify the pathogen and recommend immediate treatment protocols.
            </p>
            <ul className="space-y-4">
              {["Detects 38 common diseases", "Works in under 1 second", "Provides actionable chemical treatments"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-neutral-700 dark:text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-3xl rotate-3 scale-105 blur-lg"></div>
             <div className="relative bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl dark:shadow-none flex flex-col items-center">
                <div className="w-full h-48 bg-neutral-200 dark:bg-zinc-800 rounded-2xl mb-6 relative overflow-hidden group">
                   <img src="/leaf.jpg" alt="Leaf" className="w-full h-full object-cover opacity-60" />
                   <div className="absolute inset-0 border-2 border-blue-500 rounded-2xl flex items-center justify-center bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">Scanning...</div>
                   </div>
                </div>
                <div className="w-full bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-4 flex items-center gap-4">
                   <ShieldAlert className="w-8 h-8 text-red-500" />
                   <div>
                     <p className="font-bold text-red-900 dark:text-red-400">Apple Scab Detected</p>
                     <p className="text-xs text-red-700 dark:text-red-300">Confidence: 98.2%</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Bento Grid for Secondary Features */}
      <section className="py-24 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-zinc-50 mb-4">Complete Farm Management</h2>
            <p className="text-neutral-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Everything else you need to run your digital farm operations seamlessly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-neutral-200 dark:border-zinc-800 lg:col-span-2">
              <Bot className="w-10 h-10 text-purple-500 mb-4" />
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-zinc-50 mb-3">AI Agronomist Assistant</h3>
              <p className="text-neutral-600 dark:text-zinc-400 max-w-lg">
                Chat with our Gemini-powered AI assistant 24/7. Ask complex questions about fertilizers, harvesting times, pest control, and get instant, context-aware expert advice tailored to your crops.
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-neutral-200 dark:border-zinc-800">
              <CloudSun className="w-10 h-10 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-neutral-900 dark:text-zinc-50 mb-3">Hyper-local Weather</h3>
              <p className="text-neutral-600 dark:text-zinc-400">
                Live weather widgets on your dashboard pulling real-time, highly accurate data based on your farm's exact GPS coordinates.
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-neutral-200 dark:border-zinc-800">
              <LayoutDashboard className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-neutral-900 dark:text-zinc-50 mb-3">Unified Dashboard</h3>
              <p className="text-neutral-600 dark:text-zinc-400">
                A centralized hub to view your farm overview, recent activity, and environmental conditions all in one glance.
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-neutral-200 dark:border-zinc-800 lg:col-span-2">
              <History className="w-10 h-10 text-neutral-500 dark:text-zinc-400 mb-4" />
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-zinc-50 mb-3">Activity Tracking & History</h3>
              <p className="text-neutral-600 dark:text-zinc-400 max-w-lg">
                Never lose track of a recommendation. Every crop suggestion and disease scan is securely saved to your account history, allowing you to track seasonal trends and past treatments easily.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
