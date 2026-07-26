import { ChevronDown, Mail, HelpCircle } from "lucide-react"

export default function FAQ() {
  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How much does CropAdvice cost?",
          a: "CropAdvice is currently free to use! We are committed to helping farmers adopt modern technology without financial barriers. Premium enterprise features will be introduced later for massive-scale operations."
        },
        {
          q: "Can I use the app on my phone?",
          a: "Yes! CropAdvice is fully responsive and works perfectly on mobile browsers, making it easy to use right in the middle of your field."
        }
      ]
    },
    {
      category: "Machine Learning & AI",
      questions: [
        {
          q: "How accurate is the disease detection?",
          a: "Our Convolutional Neural Network (CNN) has been trained on hundreds of thousands of plant images and currently boasts a 95%+ accuracy rate for over 38 different crop diseases. However, for critical issues, always consult with a local human agronomist."
        },
        {
          q: "What soil parameters do I need for crop recommendation?",
          a: "For the most accurate recommendation, you should provide Nitrogen (N), Phosphorus (P), Potassium (K) levels, as well as the pH value of your soil, and historical rainfall data. If you don't have these, a basic soil test kit from any hardware store will provide them."
        },
        {
          q: "Is the AI Agronomist actually smart?",
          a: "Yes. Our AI Agronomist is powered by Google's Gemini models, specifically prompted and grounded in agricultural and botanical sciences. It doesn't just guess; it contextualizes your questions within known agronomic best practices."
        }
      ]
    },
    {
      category: "Security & Privacy",
      questions: [
        {
          q: "Is my farm data secure?",
          a: "Absolutely. Your data is encrypted and stored securely using industry-standard protocols. We only use your location data to provide hyper-local weather forecasts and do not share your personal information with third parties."
        },
        {
          q: "Do you sell my data?",
          a: "No. Your yield data, crop choices, and locations are strictly yours. We do not aggregate and sell farm data to agricultural conglomerates."
        }
      ]
    }
  ]

  return (
    <div className="flex flex-col w-full bg-transparent transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative w-full py-24 bg-white dark:bg-zinc-900 border-b border-neutral-200 dark:border-zinc-800 text-center">
        <div className="container px-4 md:px-6 relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-800 dark:text-blue-400 mb-8 border border-blue-200 dark:border-blue-500/20">
            <HelpCircle className="w-4 h-4 mr-2" /> Support Center
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-zinc-50 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-neutral-600 dark:text-zinc-400">
            Everything you need to know about CropAdvice, our machine learning models, and how to get the most out of the platform.
          </p>
        </div>
      </section>

      {/* FAQ Accordions */}
      <section className="py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col gap-12">
            {faqs.map((group, groupIdx) => (
              <div key={groupIdx}>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-zinc-50 mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-green-500 rounded-full"></div>
                  {group.category}
                </h3>
                <div className="space-y-4">
                  {group.questions.map((faq, idx) => (
                    <details key={idx} className="group border border-neutral-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-none">
                      <summary className="flex cursor-pointer items-center justify-between p-6 text-lg font-semibold text-neutral-900 dark:text-zinc-100 select-none">
                        {faq.q}
                        <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center group-open:bg-green-100 dark:group-open:bg-green-500/20 transition-colors">
                          <ChevronDown className="h-5 w-5 text-neutral-500 dark:text-zinc-400 group-open:text-green-600 dark:group-open:text-green-400 transition-transform duration-300 group-open:rotate-180" />
                        </div>
                      </summary>
                      <div className="px-6 pb-6 pt-2 text-neutral-600 dark:text-zinc-400 leading-relaxed border-t border-neutral-100 dark:border-zinc-800/50 mt-2">
                        <p>{faq.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still need help CTA */}
      <section className="pb-24 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-green-600 to-emerald-800 rounded-3xl p-12 text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
            <h2 className="text-3xl font-bold mb-4 relative z-10">Still have questions?</h2>
            <p className="text-green-100 mb-8 max-w-xl mx-auto relative z-10">
              Can't find the answer you're looking for? Please email our friendly team, we're always happy to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
              <button className="flex items-center gap-2 bg-white hover:bg-neutral-100 text-green-900 border border-green-500/30 px-6 py-3 rounded-xl font-bold transition-colors shadow-xl">
                <Mail className="w-5 h-5" /> support@cropadvice.com
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
