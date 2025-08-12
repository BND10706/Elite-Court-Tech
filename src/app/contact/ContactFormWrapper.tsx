'use client'
import dynamic from 'next/dynamic'

// Dynamically import the form (client-only) without disabling SSR at page level.
// If the form uses browser-only APIs on mount, dynamic import keeps page shell fast.
const ContactForm = dynamic(() => import('../../components/ContactForm'), {
  loading: () => (
    <div className='mt-6 text-sm text-[var(--text-secondary)]'>
      Loading form…
    </div>
  ),
})

export default function ContactFormWrapper() {
  return <ContactForm />
}
