const STORAGE_KEY = "ADOTAPET_PRODUCTION"

export function getLocalStorage(key: string) {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(`${STORAGE_KEY}_${key}`)
    return JSON.parse(data!)
  }
  return null
}

export function setLocalStorage(key: string, value: unknown) {
  if (typeof window !== "undefined") {
    const data = JSON.stringify(value)
    return window.localStorage.setItem(`${STORAGE_KEY}_${key}`, data)
  }
}

export function removeLocalStorage(key: string) {
  if (typeof window !== "undefined") {
    return window.localStorage.removeItem(`${STORAGE_KEY}_${key}`)
  }
}
