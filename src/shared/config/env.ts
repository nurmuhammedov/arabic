const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_BASE_URL
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return `http://${hostname}:8080`
    }
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:8080'
    }
  }
  return envUrl || 'http://localhost:8080'
}

export const BASE_URL: string = getBaseUrl()
export const IS_DEV: boolean = import.meta.env.VITE_IS_DEV === 'true' || false
export const CLIENT_ID: string = import.meta.env.VITE_CLIENT_ID || 'client_id'
export const CLIENT_SECRET: string = import.meta.env.VITE_CLIENT_SECRET || 'client_secret'
export const REDIRECT_URI: string = import.meta.env.VITE_REDIRECT_URI || 'redirect_uri'
export const PAGE_SIZE: string = '20'
