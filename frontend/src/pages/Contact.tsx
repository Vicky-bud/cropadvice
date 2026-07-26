import { Mail, MapPin, Phone } from "lucide-react"

export default function Contact() {
  return (
    <div className="flex flex-col w-full bg-white dark:bg-neutral-950">
      <section className="relative w-full py-24 bg-green-50 dark:bg-neutral-900 border-b">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Get in Touch</h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Have questions about CropAdvice or need agronomic support? We're here to help.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            
            {/* Contact Info */}
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                  Fill out the form and our team will get back to you within 24 hours. For immediate assistance, feel free to call us.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600 dark:text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-neutral-500">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-green-600 dark:text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-neutral-500">support@cropadvice.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-600 dark:text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Headquarters</h4>
                    <p className="text-neutral-500">123 Farm Lane, AgTech City, CA 90210</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-neutral-50 dark:bg-neutral-900 p-8 rounded-2xl border">
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Thanks for reaching out! We will contact you soon."); }}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <input type="text" className="w-full h-10 px-3 rounded-md border bg-white dark:bg-neutral-950" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <input type="text" className="w-full h-10 px-3 rounded-md border bg-white dark:bg-neutral-950" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input type="email" className="w-full h-10 px-3 rounded-md border bg-white dark:bg-neutral-950" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea className="w-full min-h-[120px] p-3 rounded-md border bg-white dark:bg-neutral-950 resize-none" required></textarea>
                </div>
                <button type="submit" className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors mt-2">
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
