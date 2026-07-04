const KEY = 'dreamx_recent_searches'
const MAX_RECENT = 5

export function getRecentSearches() {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

export function addRecentSearch(term) {
  const trimmed = term.trim()
  if (!trimmed) return
  const existing = getRecentSearches().filter((t) => t.toLowerCase() !== trimmed.toLowerCase())
  const updated = [trimmed, ...existing].slice(0, MAX_RECENT)
  localStorage.setItem(KEY, JSON.stringify(updated))
}

export function clearRecentSearches() {
  localStorage.removeItem(KEY)
}
