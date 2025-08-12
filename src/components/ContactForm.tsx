'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <form className='mt-6 space-y-6' onSubmit={onSubmit}>
      <div>
        <label className='block mb-2 text-sm text-[var(--text-secondary)]'>
          Full Name
        </label>
        <input
          type='text'
          required
          placeholder='John Doe'
          className='block w-full px-5 py-3 mt-1 text-[var(--text-primary)] placeholder-[var(--text-secondary)] bg-[var(--background-secondary)] border border-[var(--text-secondary)]/20 rounded-md focus:border-[var(--accent-orange)] focus:ring-[var(--accent-orange)] focus:outline-none focus:ring focus:ring-opacity-40'
        />
      </div>
      <div>
        <label className='block mb-2 text-sm text-[var(--text-secondary)]'>
          Email address
        </label>
        <input
          type='email'
          required
          placeholder='you@example.com'
          className='block w-full px-5 py-3 mt-1 text-[var(--text-primary)] placeholder-[var(--text-secondary)] bg-[var(--background-secondary)] border border-[var(--text-secondary)]/20 rounded-md focus:border-[var(--accent-orange)] focus:ring-[var(--accent-orange)] focus:outline-none focus:ring focus:ring-opacity-40'
        />
      </div>
      <div>
        <label className='block mb-2 text-sm text-[var(--text-secondary)]'>
          Message
        </label>
        <textarea
          required
          placeholder='How can we help?'
          className='block w-full h-40 px-5 py-3 mt-1 text-[var(--text-primary)] placeholder-[var(--text-secondary)] bg-[var(--background-secondary)] border border-[var(--text-secondary)]/20 rounded-md resize-y focus:border-[var(--accent-orange)] focus:ring-[var(--accent-orange)] focus:outline-none focus:ring focus:ring-opacity-40'
        />
      </div>
      <button
        type='submit'
        className='w-full px-6 py-3 text-sm font-medium tracking-wide bg-[var(--accent-orange)] text-black rounded-md transition-colors hover:bg-[var(--accent-orange)]/90 focus:outline-none focus:ring focus:ring-[var(--accent-orange)] focus:ring-opacity-40'
      >
        {submitted ? 'Sent' : 'Send message'}
      </button>
      {submitted && (
        <p className='text-sm text-[var(--accent-orange)]'>
          Message captured locally (no backend wired yet).
        </p>
      )}
    </form>
  )
}
