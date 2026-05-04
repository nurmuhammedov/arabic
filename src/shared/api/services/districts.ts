import { apiClient } from '../api-client'

export const districtsService = {
  getAll: async (regionId?: string) => {
    const { data } = await apiClient.get('/districts', { params: { regionId } })
    return data
  },
}
