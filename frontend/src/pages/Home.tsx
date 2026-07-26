import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Sprout, ShieldCheck, Bot, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col w-full relative transition-colors duration-300 bg-transparent">
      
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-end px-4 md:px-12 lg:px-24 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 via-neutral-50/80 dark:from-zinc-950 dark:via-zinc-950/80 to-transparent z-10"></div>
          <img 
            alt="A lush field at dusk" 
            className="w-full h-full object-cover dark:grayscale-[50%] opacity-80 dark:opacity-30 scale-105" 
            src="/field.jpg"
          />
        </div>
        <div className="relative z-20 max-w-2xl">
          <p className="text-xs md:text-sm font-semibold text-green-700 dark:text-green-400 mb-4 tracking-[0.2em] uppercase">
            Agricultural Intelligence
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold text-neutral-900 dark:text-neutral-50 mb-6 leading-[1.1] tracking-tight">
            Precision in <br/>Every Seed.
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-lg leading-relaxed">
            Harnessing the power of advanced AI to transform traditional farming into a data-driven science of abundance.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link to="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full px-8 h-14 font-semibold tracking-wide transition-all active:scale-95 shadow-lg shadow-green-500/20">
                EXPLORE TECH <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/features" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full border-neutral-300 dark:border-zinc-800 text-neutral-700 dark:text-zinc-300 hover:bg-neutral-200 dark:hover:bg-zinc-800 rounded-full px-8 h-14 font-semibold tracking-wide backdrop-blur-sm transition-all active:scale-95">
                WATCH FILM
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="px-4 md:px-12 lg:px-24 mt-8 flex flex-col gap-8 pb-32">
        <div className="mb-6">
          <h3 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">Our Expertise</h3>
          <div className="w-12 h-1.5 bg-green-600 dark:bg-green-500 mt-4 rounded-full"></div>
        </div>

        <div className="flex flex-col gap-24 mt-12">
          {/* Feature 1: Asymmetric Left */}
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24 group">
            <div className="w-full md:w-1/2 relative">
              <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-700"></div>
              <div className="relative aspect-square sm:aspect-video md:aspect-square bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl flex items-center justify-center p-8">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-600"></div>
                <div className="relative z-10 text-center flex flex-col items-center">
                  <Sprout className="w-24 h-24 text-green-500 mb-6 drop-shadow-lg" strokeWidth={1} />
                  <div className="text-4xl font-black text-neutral-900 dark:text-zinc-50 tracking-tighter">98.5%</div>
                  <div className="text-sm font-bold tracking-widest text-neutral-500 dark:text-zinc-400 uppercase mt-2">Prediction Accuracy</div>
                </div>
                {/* Decorative background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-sm font-bold tracking-wide uppercase border border-green-200 dark:border-green-500/20">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Intelligence
              </div>
              <h4 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-zinc-50 tracking-tight leading-tight">
                Crop <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Recommendation</span>
              </h4>
              <p className="text-lg text-neutral-600 dark:text-zinc-400 leading-relaxed max-w-lg">
                Stop guessing. Our AI-driven soil analysis determines the perfect match for your specific land conditions and climate, maximizing your yield potential before you even plant a single seed.
              </p>
              <div className="pt-4">
                <Link to="/features" className="inline-flex items-center gap-2 text-green-700 dark:text-green-400 font-bold text-sm tracking-widest uppercase hover:gap-4 transition-all">
                  DISCOVER HOW <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Feature 2: Asymmetric Right */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24 group">
            <div className="w-full md:w-1/2 relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-700"></div>
              <div className="relative aspect-square sm:aspect-video md:aspect-square bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl flex items-center justify-center p-8">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-600"></div>
                <div className="relative z-10 w-full max-w-sm">
                  {/* Mock UI Scanner */}
                  <div className="w-full bg-neutral-50 dark:bg-zinc-950 rounded-2xl border border-neutral-200 dark:border-zinc-800 p-4 shadow-inner">
                    <div className="h-48 rounded-xl bg-neutral-200 dark:bg-zinc-800 relative overflow-hidden mb-4">
                      <img src="/leaf.jpg" alt="Scanning Leaf" className="w-full h-full object-cover opacity-80" />
                      <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,1)] animate-[scan_2s_ease-in-out_infinite]"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-blue-500" />
                        <div>
                          <div className="font-bold text-neutral-900 dark:text-zinc-50">Pathogen Found</div>
                          <div className="text-xs text-neutral-500 dark:text-zinc-400">Analysis complete</div>
                        </div>
                      </div>
                      <div className="text-blue-600 font-bold text-sm bg-blue-50 dark:bg-blue-500/20 px-3 py-1 rounded-full">99.2%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-sm font-bold tracking-wide uppercase border border-blue-200 dark:border-blue-500/20">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> Security
              </div>
              <h4 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-zinc-50 tracking-tight leading-tight">
                Pathogen <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Detection</span>
              </h4>
              <p className="text-lg text-neutral-600 dark:text-zinc-400 leading-relaxed max-w-lg">
                Instant leaf-scan technology. Identify threats with clinical precision and receive immediate, actionable treatment protocols before diseases can spread through your fields.
              </p>
              <div className="pt-4">
                <Link to="/features" className="inline-flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold text-sm tracking-widest uppercase hover:gap-4 transition-all">
                  SCAN NOW <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Feature 3: Full Width Banner */}
          <div className="w-full mt-12 relative group rounded-[2.5rem] overflow-hidden bg-neutral-900 dark:bg-zinc-900 border border-neutral-800 dark:border-zinc-800 shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-500/20 to-transparent blur-3xl group-hover:from-purple-500/30 transition-colors duration-700"></div>
            
            <div className="relative z-10 p-12 md:p-16 lg:p-24 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="w-full md:w-3/5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-sm font-bold tracking-wide uppercase border border-purple-500/20">
                  <Bot className="w-4 h-4" /> 24/7 Support
                </div>
                <h4 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Meet your new <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AI Agronomist</span>
                </h4>
                <p className="text-lg text-neutral-300 leading-relaxed max-w-lg">
                  Your dedicated agricultural partner, powered by Gemini. Ask complex questions about irrigation schedules, fertilizing mixes, and harvesting times—and get real-time, science-backed answers.
                </p>
                <div className="pt-8">
                  <Link to="/register">
                    <button className="bg-white text-neutral-900 hover:bg-neutral-200 px-8 py-4 rounded-full font-bold tracking-wide transition-all active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                      START CHATTING
                    </button>
                  </Link>
                </div>
              </div>
              <div className="w-full md:w-2/5 flex justify-center md:justify-end">
                {/* Abstract Bot Representation */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border border-purple-500/30 flex items-center justify-center">
                  <div className="absolute inset-2 rounded-full border border-purple-500/20 border-dashed animate-[spin_20s_linear_infinite]"></div>
                  <div className="absolute inset-8 rounded-full border border-purple-500/40 border-dotted animate-[spin_15s_linear_infinite_reverse]"></div>
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-md absolute animate-pulse"></div>
                  <Bot className="w-16 h-16 text-white relative z-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 md:px-12 lg:px-24 pb-24">
        <div className="bg-neutral-100 dark:bg-zinc-900 rounded-3xl p-12 flex flex-col md:flex-row justify-around items-center gap-12 text-center border border-neutral-200 dark:border-zinc-800">
          <div>
            <div className="text-5xl font-extrabold text-neutral-900 dark:text-zinc-50 mb-2 tracking-tight">12M+</div>
            <div className="text-xs font-bold tracking-widest text-neutral-500 dark:text-zinc-400 uppercase">ACRES PROTECTED</div>
          </div>
          <div className="w-full md:w-px h-px md:h-16 bg-neutral-300 dark:bg-zinc-800"></div>
          <div>
            <div className="text-5xl font-extrabold text-green-600 dark:text-green-500 mb-2 tracking-tight">35%</div>
            <div className="text-xs font-bold tracking-widest text-neutral-500 dark:text-zinc-400 uppercase">YIELD INCREASE</div>
          </div>
          <div className="w-full md:w-px h-px md:h-16 bg-neutral-300 dark:bg-zinc-800"></div>
          <div>
            <div className="text-5xl font-extrabold text-blue-500 dark:text-blue-500 mb-2 tracking-tight">0.9s</div>
            <div className="text-xs font-bold tracking-widest text-neutral-500 dark:text-zinc-400 uppercase">DETECTION TIME</div>
          </div>
        </div>
      </section>
    </div>
  )
}
