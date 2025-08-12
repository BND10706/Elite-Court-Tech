'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/products', label: 'Products' },
]

function AdminNavInner() {
  const pathname = usePathname()
  return (
    <nav className='flex gap-6 text-sm mb-8'>
      {links.map((l) => {
        const active = pathname === l.href
        return (
          <Link
            key={l.href}
            href={l.href}
            className={
              active
                ? 'text-accent-orange font-medium'
                : 'text-text-secondary hover:text-text-primary'
            }
          >
            {l.label}
          </Link>
        )
      })}
    </nav>
  )
}

export const AdminNav = AdminNavInner
export default AdminNavInner
