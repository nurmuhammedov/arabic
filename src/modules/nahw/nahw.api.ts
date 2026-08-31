import { useQuery } from '@tanstack/react-query'
import { CommonService } from '@topcoder/api'

import type { ICauseCount, IIrabChallenge, INahwTopic, INahwTopicDetail, IrabCause } from './nahw.types'

export const useNahwTopics = () =>
  useQuery<INahwTopic[], Error>({
    queryKey: ['nahw', 'topics'],
    queryFn: () => CommonService.getData<INahwTopic[]>('nahw/topics'),
  })

export const useNahwTopic = (slug?: string) =>
  useQuery<INahwTopicDetail, Error>({
    queryKey: ['nahw', 'topics', slug],
    queryFn: () => CommonService.getData<INahwTopicDetail>(`nahw/topics/${slug}`),
    enabled: !!slug,
  })

export const useIrabChallenge = (cause?: IrabCause) =>
  useQuery<IIrabChallenge, Error>({
    queryKey: ['nahw', 'irab', cause ?? 'any'],
    queryFn: () => CommonService.getData<IIrabChallenge>('nahw/irab', { cause, maxWords: 10 }),
    staleTime: 0,
    gcTime: 0,
  })

export const useIrabCauses = () =>
  useQuery<ICauseCount[], Error>({
    queryKey: ['nahw', 'irab', 'causes'],
    queryFn: () => CommonService.getData<ICauseCount[]>('nahw/irab/causes'),
  })
