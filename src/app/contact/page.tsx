import ContactFormWrapper from './ContactFormWrapper'

export const metadata = {
  title: 'Contact | Elite Court Tech',
  description: 'Get in touch with Elite Court Tech.',
}

export default function ContactPage() {
  return (
    <main className='min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]'>
      <section className='min-h-screen flex flex-col'>
        <div className='container flex flex-col flex-1 px-6 py-12 mx-auto lg:flex-row lg:items-center lg:gap-12'>
          {/* Left content */}
          <div className='lg:w-1/2'>
            <h1 className='text-3xl md:text-4xl font-extrabold tracking-wider text-[var(--accent-orange)]'>
              Get in touch
            </h1>
            <p className='mt-6 max-w-xl text-[var(--text-secondary)] leading-relaxed'>
              Have a question about an upcoming product, partnership, or
              training application? Drop a note below. We read every
              message—your feedback shapes the tools we build.
            </p>
            <p className='mt-4 max-w-xl text-[var(--text-secondary)] text-sm'>
              No phone or email spam panel here; just the form. We typically
              reply within 1–2 business days.
            </p>
          </div>

          {/* Form card */}
          <div className='mt-10 lg:mt-0 w-full lg:w-1/2'>
            <div className='w-full px-8 py-10 mx-auto bg-[var(--background-secondary)]/70 backdrop-blur-sm rounded-xl ring-1 ring-white/10 shadow-2xl lg:max-w-xl'>
              <h2 className='text-xl font-semibold tracking-wide'>
                Contact form
              </h2>
              <ContactFormWrapper />
            </div>
          </div>
        </div>
        {/* Subtle gradient bar at bottom using theme */}
        <div className='h-2 bg-gradient-to-r from-[var(--accent-orange)]/60 via-[var(--accent-orange)]/20 to-transparent' />
      </section>
    </main>
  )
}

// wrapper moved to separate client file
