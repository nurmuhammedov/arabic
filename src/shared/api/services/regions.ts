import { apiClient } from '../api-client'

export const regionsService = {
  getAll: async () => {
    const { data } = await apiClient.get('/regions')
    return data
  },
}
