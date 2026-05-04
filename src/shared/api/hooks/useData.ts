import { useQuery } from '@tanstack/react-query'
import { CommonService } from '@topcoder/api'
import { useTypedSelector } from '@topcoder/hooks'
import { IQueryParams } from '@topcoder/types'
import { useTranslation } from 'react-i18next'

export const useData = <TResponse>(
  endpoint: string,
  queryKey: string | string[],
  params?: IQueryParams,
  enabled: boolean = true,
  staleTime?: number
) => {
  const { i18n } = useTranslation()
  const { user } = useTypedSelector((state) => state.auth)
  const queryKeys = Array.isArray(queryKey) ? queryKey : [queryKey]

  return useQuery<TResponse, Error>({
    queryKey: [...queryKeys, endpoint, params, i18n.language, user?.role].filter((queryKey) => !!queryKey),
    queryFn: () => CommonService.getData<TResponse>(endpoint, params),
    enabled,
    staleTime,
  })
}
