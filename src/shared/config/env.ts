/**
 * Falls back to the host the page was opened from rather than to localhost, so
 * the dev server can be reached from a phone or tablet on the same network
 * without rewriting this value every time the address changes.
 */
const getBaseUrl = (): string => {
  const configured = import.meta.env.VITE_BASE_URL
  if (configured) return configured

  const { protocol, hostname } = window.location
  return `${protocol}//${hostname}:8080`
}

export const BASE_URL: string = getBaseUrl()

export const IS_DEV: boolean = import.meta.env.VITE_IS_DEV === 'true'
export const PAGE_SIZE: string = '20'
