import { Query, useMutation, useQueryClient } from '@tanstack/react-query'
import { CommonService } from '@topcoder/api'
import { showMessage } from '@topcoder/lib'
import { useTranslation } from 'react-i18next'

export const useAdd = <TResponse, TPayload>(
  endpoint: string,
  invalidateQueryKey: string | string[] = [],
  successMessage?: string
) => {
  const { t } = useTranslation(['common', 'errors'])
  const queryClient = useQueryClient()

  return useMutation<TResponse, Error, TPayload>({
    mutationFn: (payload) => CommonService.addData<TPayload, TResponse>(endpoint, payload),
    onSuccess: () => {
      const invalidateQueryKeys = Array.isArray(invalidateQueryKey) ? invalidateQueryKey : [invalidateQueryKey]

      if (successMessage) {
        showMessage(successMessage)
      }

      if (invalidateQueryKeys?.length > 0) {
        queryClient
          .invalidateQueries({
            predicate: (query: Query) => {
              const queryKey = query.queryKey[0]
              return typeof queryKey === 'string' && invalidateQueryKeys.includes(queryKey)
            },
          })
          .catch(() => {
            showMessage(t('unexpected_error_refreshing_data', { ns: 'errors' }), 'alert')
          })
      }
    },
  })
}
