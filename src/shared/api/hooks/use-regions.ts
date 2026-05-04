import { useQuery } from '@tanstack/react-query'

import { regionsService } from '../services/regions'

export const useRegions = () => {
  return useQuery({
    queryKey: ['regions'],
    queryFn: regionsService.getAll,
  })
}
