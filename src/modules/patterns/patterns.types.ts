export enum PatternCategory {
  ACTIVE_PARTICIPLE = 'ACTIVE_PARTICIPLE',
  PASSIVE_PARTICIPLE = 'PASSIVE_PARTICIPLE',
  VERBAL_NOUN = 'VERBAL_NOUN',
  PLACE_OR_TIME = 'PLACE_OR_TIME',
  ADJECTIVE = 'ADJECTIVE',
  INTENSIVE = 'INTENSIVE',
  COMPARATIVE = 'COMPARATIVE',
  INSTRUMENT = 'INSTRUMENT',
  VERB = 'VERB',
  BROKEN_PLURAL = 'BROKEN_PLURAL',
  NOUN = 'NOUN',
  OTHER = 'OTHER',
}

export interface IPatternFamily {
  category: PatternCategory
  patternCount: number
  wordCount: number
  tokenCount: number
  share: number
}

export interface IPattern {
  id: string
  wazn: string
  category: PatternCategory
  meaningUz: string | null
  meaningRu: string | null
  meaningEn: string | null
  exampleWord: string | null
  exampleMeaning: string | null
  wordCount: number
  tokenCount: number
}

export interface IPatternWord {
  id: string
  arabic: string
  transcription: string | null
  uz: string | null
  frequency: number
  root: { id: string; radicals: string; meaningUz: string | null } | null
}

export interface IPatternDetail extends Omit<IPattern, 'wordCount'> {
  wordCount: number
  words: IPatternWord[]
}

export interface IPatternDrill {
  answerId: string
  wazn: string
  category: PatternCategory
  word: {
    arabic: string
    uz: string | null
    radicals: string | null
    rootMeaningUz: string | null
  } | null
  options: { id: string; wazn: string; meaningUz: string | null }[]
}
