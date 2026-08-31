import { useQuery } from '@tanstack/react-query'
import { CommonService } from '@topcoder/api'

import type { IDerivation, IRootClass, IRootClassDetail, IVerbForm, IVerbFormDetail } from './sarf.types'

export const useVerbForms = () =>
  useQuery<IVerbForm[], Error>({
    queryKey: ['sarf', 'forms'],
    queryFn: () => CommonService.getData<IVerbForm[]>('sarf/forms'),
  })

export const useVerbForm = (code?: string) =>
  useQuery<IVerbFormDetail, Error>({
    queryKey: ['sarf', 'forms', code],
    queryFn: () => CommonService.getData<IVerbFormDetail>(`sarf/forms/${code}`),
    enabled: !!code,
  })

export const useRootClasses = () =>
  useQuery<IRootClass[], Error>({
    queryKey: ['sarf', 'classes'],
    queryFn: () => CommonService.getData<IRootClass[]>('sarf/classes'),
  })

export const useRootClass = (code?: string) =>
  useQuery<IRootClassDetail, Error>({
    queryKey: ['sarf', 'classes', code],
    queryFn: () => CommonService.getData<IRootClassDetail>(`sarf/classes/${code}`),
    enabled: !!code,
  })

export const useDerivation = () =>
  useQuery<IDerivation, Error>({
    queryKey: ['sarf', 'derive'],
    queryFn: () => CommonService.getData<IDerivation>('sarf/derive'),
    staleTime: 0,
    gcTime: 0,
  })
