import { useQuery } from '@tanstack/react-query'

import { districtsService } from '../services/districts'

export const useDistricts = (regionId?: string) => {
  return useQuery({
    queryKey: ['districts', regionId],
    queryFn: () => districtsService.getAll(regionId),
    enabled: !!regionId,
  })
}
