import { apiClient } from '@topcoder/api'
import { IAxiosResponse, IListResponse, IQueryParams } from '@topcoder/types'

export const CommonService = {
  getPaginatedData: async <TResponse>(
    endpoint: string,
    params: IQueryParams = {}
  ): Promise<IListResponse<TResponse>> => {
    const response = await apiClient.get<IAxiosResponse<IListResponse<TResponse>>>(endpoint, { params })
    return response.data.data
  },

  async addData<TPayload, TResponse>(endpoint: string, payload: TPayload) {
    const res = await apiClient.post<IAxiosResponse<TResponse>>(endpoint, payload)
    return res.data.data
  },

  async updateData<TPayload, TResponse>(endpoint: string, payload: TPayload, id: string | number | undefined | null) {
    const url = endpoint.endsWith('/') ? `${endpoint}${id}` : `${endpoint}/${id}`
    const res = await apiClient.put<IAxiosResponse<TResponse>>(url, payload)
    return res.data.data
  },

  async partialUpdateData<TPayload, TResponse>(
    endpoint: string,
    payload: TPayload,
    id: string | number | undefined | null
  ) {
    const url = endpoint.endsWith('/') ? `${endpoint}${id}` : `${endpoint}/${id}`
    const res = await apiClient.patch<IAxiosResponse<TResponse>>(url, payload)
    return res.data.data
  },

  async deleteData<TResponse>(endpoint: string, id: string | number | undefined | null) {
    const url = endpoint.endsWith('/') ? `${endpoint}${id}` : `${endpoint}/${id}`
    const res = await apiClient.delete<IAxiosResponse<TResponse>>(url)
    return res.data.data
  },

  async getDetail<TResponse>(endpoint: string, id: string | number | undefined | null, params: IQueryParams = {}) {
    const url = endpoint.endsWith('/') ? `${endpoint}${id}` : `${endpoint}/${id}`
    const res = await apiClient.get<IAxiosResponse<TResponse>>(url, { params })
    return res.data.data
  },

  async getData<TResponse>(endpoint: string, params: IQueryParams = {}) {
    const res = await apiClient.get<IAxiosResponse<TResponse>>(endpoint, { params })
    return res.data.data
  },
}
