'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const VARIANTS = {
  primary:
    'bg-primary-600 text-white shadow-soft hover:bg-primary-700 hover:shadow-glow',
  secondary:
    'bg-white text-dark border border-border hover:border-primary-500 hover:text-primary-600',
  accent:
    'bg-accent-600 text-white shadow-soft hover:bg-accent-700',
  ghost:
    'bg-transparent text-dark hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-white/10',
  danger:
    'bg-danger text-white hover:bg-red-600',
}

const SIZES = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-base',
  lg: 'h-[52px] px-8 text-base',
}

/**
 * Shared button primitive. Renders a Link when `href` is passed, otherwise
 * a native button — same visual language either way.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  loading = false,
  disabled = false,
  icon: Icon,
  className = '',
  ...props
}) {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold',
    'transition-all duration-200 active:scale-[0.97]',
    'disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100',
    VARIANTS[variant],
    SIZES[size],
    className,
  ].join(' ')

  const content = (
    <>
      {loading ? <Loader2 className="animate-spin" size={18} /> : Icon ? <Icon size={18} /> : null}
      {children}
    </>
  )

  const motionProps = {
    whileHover: disabled || loading ? undefined : { scale: 1.02 },
    whileTap: disabled || loading ? undefined : { scale: 0.97 },
    transition: { duration: 0.15 },
  }

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={classes} aria-disabled={disabled}>
          {content}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      className={classes}
      disabled={disabled || loading}
      {...motionProps}
      {...props}
    >
      {content}
    </motion.button>
  )
}
