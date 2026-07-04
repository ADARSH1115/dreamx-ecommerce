const TONES = {
  primary: 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-300',
  accent: 'bg-accent-50 text-accent-700 dark:bg-accent-500/10 dark:text-accent-300',
  success: 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-300',
  warning: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',
  danger: 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300',
  dark: 'bg-dark text-white',
}

export default function Badge({ children, tone = 'primary', className = '' }) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap',
        TONES[tone],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
