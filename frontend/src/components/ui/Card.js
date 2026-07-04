'use client'
import { motion } from 'framer-motion'

/**
 * Shared card primitive: soft shadow, rounded corners, optional lift-on-hover.
 */
export default function Card({ children, hover = false, glass = false, className = '', ...props }) {
  const classes = [
    'rounded-2xl border border-border/60 transition-shadow duration-200',
    glass
      ? 'bg-white/70 dark:bg-white/5 backdrop-blur-md'
      : 'bg-card dark:bg-white/5 dark:border-white/10',
    hover ? 'shadow-card hover:shadow-lift' : 'shadow-soft',
    className,
  ].join(' ')

  if (!hover) {
    return (
      <div className={classes} {...props}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={classes}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
