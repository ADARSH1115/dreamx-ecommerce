'use client'
import { motion } from 'framer-motion'

/**
 * Next.js remounts this on every navigation, giving us a hook for a page
 * transition without touching individual pages.
 */
export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
