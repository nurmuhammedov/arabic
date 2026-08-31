import { useQuery } from '@tanstack/react-query'
import { CommonService } from '@topcoder/api'

import type { IParticleDetail, IParticleGroup } from './huruf.types'

export const useParticleGroups = () =>
  useQuery<IParticleGroup[], Error>({
    queryKey: ['huruf', 'by-category'],
    queryFn: () => CommonService.getData<IParticleGroup[]>('huruf/by-category'),
  })

export const useParticle = (id?: string) =>
  useQuery<IParticleDetail, Error>({
    queryKey: ['huruf', id],
    queryFn: () => CommonService.getData<IParticleDetail>(`huruf/${id}`),
    enabled: !!id,
  })
