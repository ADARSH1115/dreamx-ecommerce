const COMPARE_KEY = 'dreamx_compare'
const MAX_COMPARE = 4

export function getCompareIds() {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(COMPARE_KEY)) || []
  } catch {
    return []
  }
}

function saveCompareIds(ids) {
  localStorage.setItem(COMPARE_KEY, JSON.stringify(ids))
  window.dispatchEvent(new Event('compare-updated'))
}

export function isInCompare(productId) {
  return getCompareIds().includes(productId)
}

/** Returns { added: boolean } so callers can toast accordingly. */
export function toggleCompare(productId) {
  const ids = getCompareIds()
  if (ids.includes(productId)) {
    saveCompareIds(ids.filter((id) => id !== productId))
    return { added: false }
  }
  if (ids.length >= MAX_COMPARE) {
    return { added: false, limitReached: true }
  }
  saveCompareIds([...ids, productId])
  return { added: true }
}
