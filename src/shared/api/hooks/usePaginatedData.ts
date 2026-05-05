import { useQuery } from '@tanstack/react-query'
import { CommonService } from '@topcoder/api'
import { useTypedSelector } from '@topcoder/hooks'
import { IListResponse, IQueryParams } from '@topcoder/types'
import { useTranslation } from 'react-i18next'

export const usePaginatedData = <TResponse>(
  endpoint: string,
  queryKey: string | string[],
  params?: IQueryParams,
  enabled: boolean = true,
  staleTime?: number
) => {
  const { i18n } = useTranslation()
  const { user } = useTypedSelector((state) => state.auth)
  const queryKeys = Array.isArray(queryKey) ? queryKey : [queryKey]

  const queryMethods = useQuery<IListResponse<TResponse>, Error>({
    queryKey: [...queryKeys, endpoint, params, i18n.language, user?.role].filter((queryKey) => !!queryKey),
    queryFn: () => CommonService.getPaginatedData<TResponse>(endpoint, params),
    enabled: !!endpoint && enabled,
    staleTime,
  })

  const content = queryMethods.data?.content || []
  const page = queryMethods.data?.page

  const data = Array.isArray(queryMethods.data) ? (queryMethods.data as unknown as TResponse[]) : content

  return {
    ...queryMethods,
    data: data,
    totalElements: page?.totalElements || 0,
    totalPages: page?.totalPages || 1,
    page: page || {
      totalElements: 0,
      totalPages: 1,
    },
  }
}
