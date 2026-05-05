import { MutateOptions, Query, useMutation, useQueryClient } from '@tanstack/react-query'
import { CommonService } from '@topcoder/api'
import { showMessage } from '@topcoder/lib'
import { useTranslation } from 'react-i18next'

export const useDelete = (endpoint: string, invalidateQueryKey: string | string[] = [], msg?: string) => {
  const { t } = useTranslation(['errors'])
  const queryClient = useQueryClient()

  const mutation = useMutation<unknown, Error, string | number>({
    mutationFn: (id) => CommonService.deleteData(endpoint, id),
    onSuccess: () => {
      const queryKeys = Array.isArray(invalidateQueryKey) ? invalidateQueryKey : [invalidateQueryKey]

      if (msg) {
        showMessage(msg)
      }

      if (queryKeys?.length > 0) {
        queryClient
          .invalidateQueries({
            predicate: (query: Query) => {
              const queryKey = query.queryKey[0]
              return typeof queryKey === 'string' && queryKeys.includes(queryKey)
            },
          })
          .catch(() => {
            showMessage(t('unexpected_error_refreshing_data', { ns: 'errors' }), 'alert')
          })
      }
    },
  })

  return {
    ...mutation,
    mutate: (id: string | number, options?: MutateOptions<unknown, Error, string | number>) =>
      mutation.mutate(id, options),
    mutateAsync: (id: string | number, options?: MutateOptions<unknown, Error, string | number>) =>
      mutation.mutateAsync(id, options),
  }
}
