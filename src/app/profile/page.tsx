'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

type ProfileForm = {
  firstName: string
  lastName: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [awaitingOtp, setAwaitingOtp] = useState(false)
  const [otp, setOtp] = useState('')
  const [otpSentTo, setOtpSentTo] = useState<string>('')
  const [form, setForm] = useState<ProfileForm>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  })
  const [userId, setUserId] = useState<string>('')
  const [originalEmail, setOriginalEmail] = useState<string>('')
  const [originalAuthPhone, setOriginalAuthPhone] = useState<string>('')

  // helpers for phone formatting
  const digitsOnly = (v: string) => v.replace(/\D/g, '')
  const formatPhone = (digits: string) => {
    const d = digits.slice(0, 10)
    if (d.length <= 3) return d ? `(${d}` : ''
    if (d.length <= 6) return `(${d.slice(0, 3)})${d.slice(3)}`
    return `(${d.slice(0, 3)})${d.slice(3, 6)}-${d.slice(6)}`
  }
  const toE164US = (digits: string) =>
    digits.length === 10
      ? `+1${digits}`
      : digits.startsWith('+')
      ? digits
      : `+${digits}`

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'phone') {
      const only = digitsOnly(value)
      setForm((f) => ({ ...f, phone: formatPhone(only) }))
      return
    }
    setForm((f) => ({ ...f, [name]: value }))
  }

  useEffect(() => {
    let isMounted = true
    async function load() {
      setLoading(true)
      const { data: sessionData } = await supabase.auth.getSession()
      const session = sessionData.session
      if (!session?.user) {
        router.replace('/sign-in')
        return
      }
      const u = session.user
      if (!isMounted) return
      setUserId(u.id)
      const meta = (u.user_metadata || {}) as Record<string, unknown>
      const getStr = (k: string) =>
        typeof meta[k] === 'string' ? (meta[k] as string) : ''
      const firstName = getStr('first_name') || getStr('given_name')
      const lastName = getStr('last_name') || getStr('family_name')
      const email = u.email ?? ''
      const authPhoneRaw = (u as unknown as { phone?: string }).phone ?? ''
      // fetch profile table details per schema
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name,phone,address,city,state,zip_code,country')
        .eq('id', u.id)
        .maybeSingle()
      const phone = profile?.phone ?? ''
      const fullName = (profile?.full_name ?? `${firstName} ${lastName}`).trim()
      const [pf, ...pr] = fullName.split(/\s+/)
      const pfFirst = pf || ''
      const pfLast = pr.join(' ') || ''
      setForm({
        firstName: pfFirst || firstName,
        lastName: pfLast || lastName,
        phone: formatPhone(digitsOnly(phone)),
        email: email,
        address: profile?.address ?? '',
        city: profile?.city ?? '',
        state: profile?.state ?? '',
        zipCode: profile?.zip_code ?? '',
        country: profile?.country ?? '',
      })
      setOriginalEmail(email)
      setOriginalAuthPhone(digitsOnly(authPhoneRaw))
      setLoading(false)
    }
    load()
    return () => {
      isMounted = false
    }
  }, [router])

  const displayName = useMemo(
    () => `${form.firstName} ${form.lastName}`.trim() || 'Your profile',
    [form.firstName, form.lastName]
  )

  async function onSave(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    // Basic validation
    if (!form.firstName.trim()) return setMessage('First name is required')
    if (!form.lastName.trim()) return setMessage('Last name is required')
    if (!form.email.trim()) return setMessage('Email is required')
    // If phone provided, enforce 10 digits for US format
    const phoneDigits = digitsOnly(form.phone)
    if (form.phone && phoneDigits.length !== 10)
      return setMessage('Enter a valid 10-digit US phone number')
    setSaving(true)
    try {
      // 1) Update auth metadata and email if changed
      const updates: Parameters<typeof supabase.auth.updateUser>[0] = {
        data: {
          first_name: form.firstName,
          last_name: form.lastName,
          phone: phoneDigits,
        },
      }
      const emailChanged = originalEmail && form.email !== originalEmail
      if (emailChanged) {
        updates.email = form.email
      }
      const { error: authErr } = await supabase.auth.updateUser(updates)
      if (authErr) throw authErr

      // 2) If auth phone is empty or changed, initiate phone update with OTP
      const newPhoneDigits = phoneDigits
      if (newPhoneDigits && newPhoneDigits !== originalAuthPhone) {
        // This will trigger Supabase to send an OTP to the phone (requires phone auth enabled)
        const { error: phoneErr } = await supabase.auth.updateUser({
          phone: toE164US(newPhoneDigits),
        })
        if (phoneErr) {
          // If phone OTP flow not enabled, continue but inform user
          setMessage((m) =>
            m
              ? `${m} Phone not updated in Auth: ${phoneErr.message}`
              : `Phone not updated in Auth: ${phoneErr.message}`
          )
        } else {
          setAwaitingOtp(true)
          setOtpSentTo(formatPhone(newPhoneDigits))
          setMessage(
            'We sent a verification code to your phone. Enter it below to confirm your number.'
          )
        }
      }

      // 3) Upsert into profiles table using your schema
      const { error: profErr } = await supabase.from('profiles').upsert(
        {
          id: userId,
          full_name: `${form.firstName} ${form.lastName}`.trim(),
          phone: digitsOnly(form.phone),
          address: form.address,
          city: form.city,
          state: form.state,
          zip_code: form.zipCode,
          country: form.country,
        },
        { onConflict: 'id' }
      )
      if (profErr) throw profErr

      setMessage(
        emailChanged
          ? 'Profile updated. Check your inbox to confirm your new email.'
          : 'Profile updated.'
      )
      if (emailChanged) setOriginalEmail(form.email)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Save failed.'
      setMessage(msg)
    } finally {
      setSaving(false)
    }
  }

  async function confirmPhone(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    try {
      const phoneDigits = digitsOnly(form.phone)
      const phone = toE164US(phoneDigits)
      const { error } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: 'phone_change',
      })
      if (error) throw error
      // Refresh the user so the local session reflects the new phone value
      const { data: refreshed } = await supabase.auth.getUser()
      const updatedPhone = digitsOnly(refreshed.user?.phone ?? '')
      setOriginalAuthPhone(updatedPhone || phoneDigits)
      setMessage('Phone number confirmed.')
      setAwaitingOtp(false)
      setOtp('')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Verification failed.'
      setMessage(msg)
    }
  }

  return (
    <section className='bg-background-primary text-text-primary min-h-[60vh]'>
      <div className='container mx-auto px-6 py-8'>
        <h1 className='text-2xl font-semibold'>{displayName}</h1>
        <p className='text-text-secondary mt-1'>Manage your account details.</p>

        <div className='mt-6 max-w-2xl bg-background-secondary/50 ring-1 ring-white/10 rounded-lg p-6'>
          {loading ? (
            <p className='text-text-secondary'>Loading…</p>
          ) : (
            <form
              onSubmit={onSave}
              className='grid grid-cols-1 md:grid-cols-2 gap-6'
            >
              <div>
                <label className='block mb-2 text-sm text-text-secondary'>
                  First name
                </label>
                <input
                  name='firstName'
                  value={form.firstName}
                  onChange={onChange}
                  className='block w-full px-4 py-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
                  placeholder='Jane'
                  required
                />
              </div>
              <div>
                <label className='block mb-2 text-sm text-text-secondary'>
                  Last name
                </label>
                <input
                  name='lastName'
                  value={form.lastName}
                  onChange={onChange}
                  className='block w-full px-4 py-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
                  placeholder='Doe'
                  required
                />
              </div>
              <div>
                <label className='block mb-2 text-sm text-text-secondary'>
                  Phone
                </label>
                <input
                  name='phone'
                  value={form.phone}
                  onChange={onChange}
                  className='block w-full px-4 py-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
                  placeholder='(555) 555-5555'
                  type='tel'
                />
              </div>
              <div>
                <label className='block mb-2 text-sm text-text-secondary'>
                  Email
                </label>
                <input
                  name='email'
                  value={form.email}
                  onChange={onChange}
                  className='block w-full px-4 py-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
                  placeholder='jane@example.com'
                  type='email'
                  required
                />
              </div>
              <div className='md:col-span-2'>
                <label className='block mb-2 text-sm text-text-secondary'>
                  Address
                </label>
                <input
                  name='address'
                  value={form.address}
                  onChange={onChange}
                  className='block w-full px-4 py-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
                  placeholder='123 Main St'
                />
              </div>
              <div>
                <label className='block mb-2 text-sm text-text-secondary'>
                  City
                </label>
                <input
                  name='city'
                  value={form.city}
                  onChange={onChange}
                  className='block w-full px-4 py-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
                  placeholder='Anytown'
                />
              </div>
              <div>
                <label className='block mb-2 text-sm text-text-secondary'>
                  State
                </label>
                <input
                  name='state'
                  value={form.state}
                  onChange={onChange}
                  className='block w-full px-4 py-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
                  placeholder='CA'
                />
              </div>
              <div>
                <label className='block mb-2 text-sm text-text-secondary'>
                  Zip code
                </label>
                <input
                  name='zipCode'
                  value={form.zipCode}
                  onChange={onChange}
                  className='block w-full px-4 py-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
                  placeholder='90210'
                />
              </div>
              <div>
                <label className='block mb-2 text-sm text-text-secondary'>
                  Country
                </label>
                <input
                  name='country'
                  value={form.country}
                  onChange={onChange}
                  className='block w-full px-4 py-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
                  placeholder='United States'
                />
              </div>
              {awaitingOtp && (
                <>
                  <div className='md:col-span-2'>
                    <label className='block mb-2 text-sm text-text-secondary'>
                      Enter verification code
                    </label>
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className='block w-full px-4 py-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
                      placeholder='6-digit code'
                      inputMode='numeric'
                      maxLength={10}
                    />
                    {otpSentTo && (
                      <p className='mt-2 text-xs text-text-secondary'>
                        Code sent to {otpSentTo}
                      </p>
                    )}
                  </div>
                  <div className='md:col-span-2'>
                    <Button onClick={confirmPhone} type='button'>
                      Confirm phone
                    </Button>
                  </div>
                </>
              )}
              <div className='md:col-span-2'>
                <Button type='submit' disabled={saving}>
                  {saving ? 'Saving…' : 'Save changes'}
                </Button>
              </div>
              {message && (
                <p className='md:col-span-2 text-sm text-accent-orange'>
                  {message}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
