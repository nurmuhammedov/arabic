export const getLocalStorage = <T>(name: string): T | null => {
  try {
    const item = localStorage.getItem(name)
    return item ? (JSON.parse(item) as T) : null
  } catch (error) {
    console.error(`Error parsing localStorage item "${name}":`, error)
    return null
  }
}

export const saveToLocalStorage = <T>(name: string, data: T): void => {
  try {
    localStorage.setItem(name, JSON.stringify(data))
  } catch (error) {
    console.error(`Error saving data to localStorage with key "${name}":`, error)
  }
}
