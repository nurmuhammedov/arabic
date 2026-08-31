import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CommonService } from '@topcoder/api'

import type { IAnswerResult, IDeck, ISession, IStudyStats, IUserDeck, ReviewGrade, StudyDirection } from './study.types'

const SESSION_KEY = ['study', 'session']
const STATS_KEY = ['study', 'stats']
const MY_DECKS_KEY = ['study', 'decks']

export const useSession = (deckId?: string, limit = 20) =>
  useQuery<ISession, Error>({
    queryKey: [...SESSION_KEY, deckId ?? 'all', limit],
    queryFn: () => CommonService.getData<ISession>('study/session', { deckId, limit }),
    // The queue is the source of truth for what to show next; never serve it stale.
    staleTime: 0,
    gcTime: 0,
  })

export const useStudyStats = () =>
  useQuery<IStudyStats, Error>({
    queryKey: STATS_KEY,
    queryFn: () => CommonService.getData<IStudyStats>('study/stats'),
  })

export const useAnswer = () => {
  const queryClient = useQueryClient()

  return useMutation<
    IAnswerResult,
    Error,
    { wordId: string; direction: StudyDirection; grade: ReviewGrade; durationMs?: number }
  >({
    mutationFn: (payload) => CommonService.addData('study/answer', payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: STATS_KEY })
    },
  })
}

export const useAvailableDecks = () =>
  useQuery<IDeck[], Error>({
    queryKey: ['decks'],
    queryFn: () => CommonService.getData<IDeck[]>('decks'),
  })

export const useMyDecks = () =>
  useQuery<IUserDeck[], Error>({
    queryKey: MY_DECKS_KEY,
    queryFn: () => CommonService.getData<IUserDeck[]>('study/decks'),
  })

export const useAddDeck = () => {
  const queryClient = useQueryClient()

  return useMutation<IUserDeck, Error, { deckId: string; dailyNewLimit?: number }>({
    mutationFn: (payload) => CommonService.addData('study/decks', payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: MY_DECKS_KEY })
      void queryClient.invalidateQueries({ queryKey: SESSION_KEY })
    },
  })
}

export const useRemoveDeck = () => {
  const queryClient = useQueryClient()

  return useMutation<{ success: boolean }, Error, string>({
    mutationFn: (deckId) => CommonService.deleteData('study/decks/', deckId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: MY_DECKS_KEY })
      void queryClient.invalidateQueries({ queryKey: SESSION_KEY })
    },
  })
}
