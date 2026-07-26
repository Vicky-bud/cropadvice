export default function Terms() {
  return (
    <div className="flex flex-col w-full bg-transparent transition-colors duration-300">
      <section className="relative w-full py-24 bg-white dark:bg-zinc-900 border-b border-neutral-200 dark:border-zinc-800 text-center">
        <div className="container px-4 md:px-6 relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-zinc-50 mb-6">
            Terms & Conditions
          </h1>
          <p className="text-lg text-neutral-600 dark:text-zinc-400">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl text-neutral-800 dark:text-zinc-300 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-zinc-50 mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using CropAdvice, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-zinc-50 mb-4">2. Disclaimer of Warranties</h2>
            <p className="leading-relaxed">
              The services and all information, content, and materials included on or otherwise made available to you through our services are provided on an "as is" and "as available" basis. CropAdvice's machine learning models provide recommendations and diagnoses which are meant to serve as a supportive tool for farmers, not a replacement for professional human agronomic judgment.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-zinc-50 mb-4">3. Limitation of Liability</h2>
            <p className="leading-relaxed">
              In no event shall CropAdvice, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, crop yield, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-zinc-50 mb-4">4. User Account Responsibilities</h2>
            <p className="leading-relaxed">
              You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
