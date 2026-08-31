export enum StudyDirection {
  RECOGNIZE = 'RECOGNIZE',
  PRODUCE = 'PRODUCE',
  ROOT = 'ROOT',
  LISTEN = 'LISTEN',
}

export enum CardState {
  NEW = 'NEW',
  LEARNING = 'LEARNING',
  REVIEW = 'REVIEW',
  RELEARNING = 'RELEARNING',
}

export enum ReviewGrade {
  AGAIN = 1,
  HARD = 2,
  GOOD = 3,
  EASY = 4,
}

export interface ISessionCard {
  wordId: string
  direction: StudyDirection
  isNew: boolean
  dueAt: string | null
  arabic: string
  transcription: string | null
  glosses: Record<string, string | null>
  frequency: number
  frequencyRank: number | null
  root: { radicals: string; meaning: string | null } | null
  pattern: { wazn: string; meaning: string | null; example: string | null } | null
  example: { sura: number; ayah: number; text: string; surfaceForm: string } | null
}

export interface ISession {
  cards: ISessionCard[]
  counts: { due: number; new: number; remainingNewToday: number }
}

export interface IAnswerResult {
  wordId: string
  direction: StudyDirection
  state: CardState
  dueAt: string
  stability: number
  difficulty: number
  intervalDays: number
  reps: number
  lapses: number
  unlockedDirections: StudyDirection[]
}

export interface IStudyStats {
  byState: Partial<Record<CardState, number>>
  dueNow: number
  quranCoverage: number
}

export interface IDeck {
  id: string
  titleUz: string
  titleRu: string | null
  titleEn: string | null
  description: string | null
  type: string
  wordCount: number
  coverage: number | null
}

export interface IUserDeck {
  id: string
  deckId: string
  dailyNewLimit: number
  isActive: boolean
  deck: IDeck
}
