import { apiClient } from '@topcoder/api'
import { IAxiosResponse, IUser, TypeAny } from '@topcoder/types'

export const AuthService = {
  async login(credentials: TypeAny) {
    const payload = {
      login: credentials.username,
      password: credentials.password,
    }
    const response = await apiClient.post<IAxiosResponse<IUser>>('auth/login', payload)
    return response.data.data
  },

  async oneIDLogin(credentials: TypeAny) {
    const response = await apiClient.post<IAxiosResponse<IUser>>('auth/one-id', credentials)
    return response.data.data
  },

  async me() {
    const response = await apiClient.get<IAxiosResponse<IUser>>('auth/profile')
    return response.data.data
  },

  async register(data: TypeAny) {
    const response = await apiClient.post<IAxiosResponse<IUser>>('auth/register', data)
    return response.data.data
  },

  async logout() {
    const response = await apiClient.post<IAxiosResponse<TypeAny>>('auth/logout')
    return response.data.message || 'success'
  },
}
