import { useQuery } from '@tanstack/react-query'
import { CommonService } from '@topcoder/api'

import type { IPattern, IPatternDetail, IPatternDrill, IPatternFamily, PatternCategory } from './patterns.types'

export const usePatternFamilies = () =>
  useQuery<IPatternFamily[], Error>({
    queryKey: ['patterns', 'families'],
    queryFn: () => CommonService.getData<IPatternFamily[]>('patterns/families'),
  })

export const usePatterns = (category?: PatternCategory) =>
  useQuery<IPattern[], Error>({
    queryKey: ['patterns', 'list', category ?? 'all'],
    queryFn: () =>
      CommonService.getData<IPattern[]>('patterns', category ? { category } : {}),
  })

export const usePattern = (id?: string) =>
  useQuery<IPatternDetail, Error>({
    queryKey: ['patterns', 'detail', id],
    queryFn: () => CommonService.getData<IPatternDetail>(`patterns/${id}`),
    enabled: !!id,
  })

export const usePatternDrill = (category?: PatternCategory) =>
  useQuery<IPatternDrill, Error>({
    queryKey: ['patterns', 'drill', category ?? 'all'],
    queryFn: () =>
      CommonService.getData<IPatternDrill>('patterns/drill', category ? { category } : {}),
    staleTime: 0,
    gcTime: 0,
  })
