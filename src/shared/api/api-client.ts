import { BASE_URL } from '@topcoder/config'
import { removeEmptyParams, showMessage } from '@topcoder/lib'
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: `${BASE_URL}/api/v1/`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    config.headers['Accept-Language'] = 'uz'
    if (config.params) {
      config.params = removeEmptyParams(config.params)
    }
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const location = window.location.pathname

    const isQrPath: boolean = location.startsWith('/qr')
    const isLoginPath: boolean = location.startsWith('/auth')

    const status: number = error?.response?.status
    const requestUrl: string = error?.response?.config?.url

    const errorMessage: string = error.response?.data?.message
    const validationErrors: string = error.response?.data?.errors

    if (status === 401 && !isQrPath && !isLoginPath) {
      window.location.replace('/auth/login')
    }

    if (requestUrl !== 'auth/profile') {
      if (status >= 400 && status < 600) {
        if (validationErrors && Object.keys(validationErrors).length > 0) {
          Object.values(validationErrors).forEach((errMessage: string | string[]) => {
            const msg = Array.isArray(errMessage) ? errMessage.join(', ') : errMessage
            showMessage(msg, 'error')
          })
        } else {
          showMessage(errorMessage || 'error_processing_request', 'error')
        }
      }
    }

    return Promise.reject(error)
  }
)
