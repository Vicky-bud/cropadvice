import { Target, ShieldCheck, Sprout, Network, Zap, Cpu } from "lucide-react"

export default function About() {
  return (
    <div className="flex flex-col w-full bg-transparent transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden border-b border-neutral-200 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-900">
        <div className="absolute inset-0 bg-grid-zinc-900/[0.04] dark:bg-grid-zinc-400/[0.05] bg-[size:32px_32px]"></div>
        <div className="container relative z-10 px-4 md:px-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-green-200 dark:border-green-500/30 bg-green-50 dark:bg-green-500/10 px-3 py-1 text-sm font-medium text-green-800 dark:text-green-400 mb-8">
            <Sprout className="w-4 h-4 mr-2" /> Our Mission
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-zinc-50 mb-6 leading-tight">
            Cultivating the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">Future of Farming</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            We are bridging the gap between centuries of agricultural intuition and cutting-edge machine learning to build a sustainable, high-yield future for every farmer.
          </p>
        </div>
      </section>

      {/* The Story / The Problem */}
      <section className="py-24 px-4 md:px-6">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-zinc-50 mb-6">The Global Challenge</h2>
            <p className="text-lg text-neutral-600 dark:text-zinc-400 mb-6 leading-relaxed">
              By 2050, global food production must increase by 70% to feed a growing population. Yet, traditional farming is facing unprecedented challenges: unpredictable climate shifts, soil degradation, and rapidly mutating crop diseases.
            </p>
            <p className="text-lg text-neutral-600 dark:text-zinc-400 leading-relaxed">
              CropAdvice was founded on a simple premise: what if every farmer had access to the world's most advanced agronomic intelligence right in their pocket? We're democratizing agricultural data science to turn uncertainty into calculated, predictable yields.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-blue-500/20 rounded-3xl blur-3xl transform -rotate-6"></div>
            <img 
              src="/farmer.jpg" 
              alt="Farmer using technology" 
              className="relative rounded-3xl shadow-2xl dark:shadow-zinc-900/50 border border-neutral-200 dark:border-zinc-800 object-cover w-full h-[400px]"
            />
          </div>
        </div>
      </section>

      {/* The Tech Stack */}
      <section className="py-24 bg-neutral-50 dark:bg-zinc-900/50 border-y border-neutral-200 dark:border-zinc-800 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-zinc-50 mb-4">Powered by Intelligence</h2>
            <p className="text-neutral-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Our platform is built on state-of-the-art machine learning models trained on millions of agricultural data points.
            </p>
          </div>
          
          <div className="relative mt-20">
            {/* Connecting Line (Desktop only) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-500/20 via-purple-500/50 to-amber-500/20 -translate-y-1/2 z-0 rounded-full"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 relative z-10">
              {/* Card 1 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full scale-50 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative bg-neutral-900 dark:bg-zinc-950 p-8 rounded-[2rem] border border-neutral-800 dark:border-zinc-800 shadow-2xl overflow-hidden hover:border-blue-500/50 transition-colors h-full flex flex-col items-center text-center">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -z-10 group-hover:bg-blue-500/20 transition-colors"></div>
                  <div className="w-20 h-20 rounded-full bg-neutral-800 dark:bg-zinc-900 border border-neutral-700 dark:border-zinc-800 flex items-center justify-center mb-6 shadow-inner relative">
                    <div className="absolute inset-0 rounded-full border border-blue-500/50 animate-[spin_10s_linear_infinite] border-dashed"></div>
                    <Network className="w-8 h-8 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-mono">RF_ENSEMBLES</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Deep decision trees analyze structural data like N-P-K, pH, and climate with 95%+ precision.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative mt-0 md:mt-12">
                <div className="absolute inset-0 bg-purple-500/10 blur-xl rounded-full scale-50 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative bg-neutral-900 dark:bg-zinc-950 p-8 rounded-[2rem] border border-neutral-800 dark:border-zinc-800 shadow-2xl overflow-hidden hover:border-purple-500/50 transition-colors h-full flex flex-col items-center text-center">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full -z-10 group-hover:bg-purple-500/20 transition-colors"></div>
                  <div className="w-20 h-20 rounded-full bg-neutral-800 dark:bg-zinc-900 border border-neutral-700 dark:border-zinc-800 flex items-center justify-center mb-6 shadow-inner relative">
                    <div className="absolute inset-0 rounded-full border border-purple-500/50 animate-[spin_8s_linear_infinite_reverse] border-dotted"></div>
                    <Cpu className="w-8 h-8 text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-mono">CNN_RESNET_V2</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Computer vision architectures identifying microscopic leaf discoloration patterns instantly.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-amber-500/10 blur-xl rounded-full scale-50 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative bg-neutral-900 dark:bg-zinc-950 p-8 rounded-[2rem] border border-neutral-800 dark:border-zinc-800 shadow-2xl overflow-hidden hover:border-amber-500/50 transition-colors h-full flex flex-col items-center text-center">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full -z-10 group-hover:bg-amber-500/20 transition-colors"></div>
                  <div className="w-20 h-20 rounded-full bg-neutral-800 dark:bg-zinc-900 border border-neutral-700 dark:border-zinc-800 flex items-center justify-center mb-6 shadow-inner relative">
                    <div className="absolute inset-2 rounded-full border border-amber-500/50 animate-ping opacity-20"></div>
                    <Zap className="w-8 h-8 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-mono">GEMINI_LLM_CORE</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Contextually grounded generative models translating complex agronomy into conversational advice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-zinc-50 mb-4">Our Core Values</h2>
          </div>
          <div className="flex flex-col gap-16 md:gap-24 relative mt-16">
            <div className="absolute left-[40px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neutral-200 dark:via-zinc-800 to-transparent"></div>
            
            {/* Value 1 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 group relative z-10">
              <div className="w-full md:w-1/2 flex justify-start md:justify-end">
                <div className="relative">
                  <span className="text-[8rem] md:text-[10rem] font-black text-neutral-100 dark:text-zinc-900 leading-none select-none tracking-tighter">01</span>
                  <div className="absolute inset-0 flex items-center justify-center md:justify-end px-8 md:px-12">
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-zinc-950 border-2 border-green-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                      <Target className="w-8 h-8 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-3xl font-extrabold text-neutral-900 dark:text-zinc-50 tracking-tight group-hover:text-green-500 transition-colors">Precision</h3>
                <p className="text-lg text-neutral-600 dark:text-zinc-400 leading-relaxed max-w-sm">
                  We don't do guesswork. Every crop recommendation and treatment protocol is exact, driven entirely by empirical data from your unique soil composition.
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16 group relative z-10">
              <div className="w-full md:w-1/2 flex justify-start">
                <div className="relative">
                  <span className="text-[8rem] md:text-[10rem] font-black text-neutral-100 dark:text-zinc-900 leading-none select-none tracking-tighter">02</span>
                  <div className="absolute inset-0 flex items-center justify-center md:justify-start px-8 md:px-12">
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-zinc-950 border-2 border-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                      <ShieldCheck className="w-8 h-8 text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-4 text-left md:text-right flex flex-col md:items-end">
                <h3 className="text-3xl font-extrabold text-neutral-900 dark:text-zinc-50 tracking-tight group-hover:text-blue-500 transition-colors">Protection</h3>
                <p className="text-lg text-neutral-600 dark:text-zinc-400 leading-relaxed max-w-sm">
                  Your harvest is your livelihood. Our instantaneous disease detection acts as an unyielding shield, stopping outbreaks before they spread across your fields.
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 group relative z-10">
              <div className="w-full md:w-1/2 flex justify-start md:justify-end">
                <div className="relative">
                  <span className="text-[8rem] md:text-[10rem] font-black text-neutral-100 dark:text-zinc-900 leading-none select-none tracking-tighter">03</span>
                  <div className="absolute inset-0 flex items-center justify-center md:justify-end px-8 md:px-12">
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-zinc-950 border-2 border-amber-500 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                      <Sprout className="w-8 h-8 text-amber-500" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-3xl font-extrabold text-neutral-900 dark:text-zinc-50 tracking-tight group-hover:text-amber-500 transition-colors">Sustainability</h3>
                <p className="text-lg text-neutral-600 dark:text-zinc-400 leading-relaxed max-w-sm">
                  Empowering farmers to optimize fertilizer usage, radically reducing chemical runoff while maximizing crop yields for a healthier planet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
