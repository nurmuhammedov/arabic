import { MutateOptions, Query, useMutation, useQueryClient } from '@tanstack/react-query'
import { CommonService } from '@topcoder/api'
import { showMessage } from '@topcoder/lib'
import { useTranslation } from 'react-i18next'

export const useUpdate = <TResponse, TPayload>(
  endpoint: string,
  invalidateQueryKey: string | string[] = [],
  method: 'put' | 'patch' = 'put',
  successMessage?: string
) => {
  const { t } = useTranslation(['common', 'errors'])
  const queryClient = useQueryClient()

  type InternalVariables = {
    payload: TPayload
    id: string | number | undefined | null
  }

  const mutation = useMutation<TResponse, Error, InternalVariables>({
    mutationFn: ({ payload, id }) => {
      if (!id) {
        showMessage(t('id_required_for_update', { ns: 'errors' }), 'alert')
        return Promise.reject()
      } else {
        return method === 'put'
          ? CommonService.updateData<TPayload, TResponse>(endpoint, payload, id)
          : CommonService.partialUpdateData<TPayload, TResponse>(endpoint, payload, id)
      }
    },
    onSuccess: () => {
      const queryKeys = Array.isArray(invalidateQueryKey) ? invalidateQueryKey : [invalidateQueryKey]

      if (successMessage) {
        showMessage(successMessage)
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
    mutate: (
      payload: TPayload,
      id: string | number | undefined | null,
      options?: MutateOptions<TResponse, Error, InternalVariables>
    ) => mutation.mutate({ payload, id }, options),
    mutateAsync: (
      payload: TPayload,
      id: string | number | undefined | null,
      options?: MutateOptions<TResponse, Error, InternalVariables>
    ) => mutation.mutateAsync({ payload, id }, options),
  }
}
