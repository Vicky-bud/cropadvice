export default function Privacy() {
  return (
    <div className="flex flex-col w-full bg-transparent transition-colors duration-300">
      <section className="relative w-full py-24 bg-white dark:bg-zinc-900 border-b border-neutral-200 dark:border-zinc-800 text-center">
        <div className="container px-4 md:px-6 relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-zinc-50 mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-neutral-600 dark:text-zinc-400">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl text-neutral-800 dark:text-zinc-300 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-zinc-50 mb-4">1. Information We Collect</h2>
            <p className="leading-relaxed">
              We collect information you provide directly to us when you create an account, use our interactive features, request customer support, or otherwise communicate with us. This includes your name, email address, password, farm location, soil data, and any crop images you upload for disease detection.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-zinc-50 mb-4">2. How We Use Your Information</h2>
            <p className="leading-relaxed">
              We use the information we collect to provide, maintain, and improve our services. Specifically, your soil data and images are processed by our machine learning models to generate crop recommendations and disease diagnosis. Your location data is used exclusively to provide hyper-local weather forecasts.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-zinc-50 mb-4">3. Data Security</h2>
            <p className="leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information against accidental or unlawful destruction, loss, alteration, and unauthorized disclosure or access. We do not sell your personal data or farming statistics to third parties or agricultural conglomerates.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-zinc-50 mb-4">4. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at support@cropadvice.com.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
