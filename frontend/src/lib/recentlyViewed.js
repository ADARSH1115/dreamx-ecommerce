const KEY = 'dreamx_recently_viewed'
const MAX_RECENT = 8

export function getRecentlyViewedIds() {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

export function addRecentlyViewed(productId) {
  const existing = getRecentlyViewedIds().filter((id) => id !== productId)
  const updated = [productId, ...existing].slice(0, MAX_RECENT)
  localStorage.setItem(KEY, JSON.stringify(updated))
}
