'use client'

import Link from 'next/link'
import React from 'react'

export type ButtonVariant = 'solid' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonBaseProps = {
  href?: string
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  as?: 'button' | 'a' | 'link'
}

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

type ButtonAsLink = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export type ButtonProps = ButtonAsButton | ButtonAsLink

export function buttonClasses({
  variant = 'solid',
  size = 'md',
  fullWidth = false,
  className,
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
}) {
  const cx = (...parts: Array<string | false | null | undefined>) =>
    parts.filter(Boolean).join(' ')
  const base =
    'inline-flex items-center justify-center rounded-md font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgb(255_107_0_/_0.35)] disabled:opacity-50 disabled:cursor-not-allowed'

  const sizes: Record<ButtonSize, string> = {
    sm: 'text-sm py-2 px-4',
    md: 'text-base py-3 px-6',
    lg: 'text-lg py-3.5 px-7',
  }

  const variants: Record<ButtonVariant, string> = {
    solid:
      'text-white bg-[var(--accent-orange)] hover:bg-[color:rgb(255_107_0_/_0.9)] shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_10px_30px_-10px_rgba(255,107,0,.55)] active:translate-y-[1px]',
    outline:
      'text-[var(--accent-orange)] border border-[var(--accent-orange)] bg-transparent hover:bg-[var(--accent-orange)] hover:text-black active:translate-y-[1px]',
  }

  return cx(
    base,
    sizes[size],
    variants[variant],
    fullWidth && 'w-full',
    className
  )
}

export default function Button(props: ButtonProps) {
  const {
    href,
    variant = 'solid',
    size = 'md',
    fullWidth = false,
    as,
    className,
    children,
    ...rest
  } = props as ButtonProps

  const classes = buttonClasses({ variant, size, fullWidth, className })

  // Link or anchor rendering
  if (href) {
    if (as === 'link' || href.startsWith('/')) {
      // Next.js <Link> for internal links
      const linkProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>
      return (
        <Link href={href} className={classes} {...linkProps}>
          {children}
        </Link>
      )
    }
    const anchorProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    )
  }

  // Button rendering
  const { type, ...buttonRest } =
    rest as React.ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button className={classes} type={type ?? 'button'} {...buttonRest}>
      {children}
    </button>
  )
}
