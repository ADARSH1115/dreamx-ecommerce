export default function Skeleton({ className = '' }) {
  return (
    <div
      className={['animate-pulse rounded-2xl bg-gray-200 dark:bg-white/10', className].join(' ')}
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/60 p-4 space-y-4">
      <Skeleton className="aspect-square w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}
