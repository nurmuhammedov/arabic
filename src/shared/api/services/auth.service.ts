import { apiClient } from '@topcoder/api'
import { IAxiosResponse, ILoginResponse, IUser } from '@topcoder/types'

export const AuthService = {
  async login(credentials: { username?: string; password?: string }) {
    const payload = {
      login: credentials.username,
      password: credentials.password,
    }
    const response = await apiClient.post<IAxiosResponse<ILoginResponse>>('auth/login', payload)
    return response.data.data
  },

  async me() {
    const response = await apiClient.get<IAxiosResponse<IUser>>('auth/profile')
    return response.data.data
  },

  async register(data: Record<string, unknown>) {
    const response = await apiClient.post<IAxiosResponse<ILoginResponse>>('auth/register', data)
    return response.data.data
  },

  async logout() {
    const response = await apiClient.post<IAxiosResponse<unknown>>('auth/logout')
    return response.data.message || 'success'
  },
}
