export enum FormCategory {
  TRILITERAL_BARE = 'TRILITERAL_BARE',
  TRILITERAL_AUGMENTED = 'TRILITERAL_AUGMENTED',
  QUADRILITERAL_BARE = 'QUADRILITERAL_BARE',
  QUADRILITERAL_AUGMENTED = 'QUADRILITERAL_AUGMENTED',
}

export enum RootClassCode {
  SOUND = 'SOUND',
  DOUBLED = 'DOUBLED',
  HAMZATED = 'HAMZATED',
  ASSIMILATED = 'ASSIMILATED',
  HOLLOW = 'HOLLOW',
  DEFECTIVE = 'DEFECTIVE',
  DOUBLY_WEAK = 'DOUBLY_WEAK',
}

export interface IVerbForm {
  id: string
  code: string
  category: FormCategory
  position: number
  corpusForm: number | null
  pastPattern: string
  presentPattern: string
  masdarPattern: string | null
  activeParticiplePattern: string | null
  passiveParticiplePattern: string | null
  imperativePattern: string | null
  meaningUz: string
  exampleRoot: string | null
  exampleWord: string | null
  exampleMeaning: string | null
  lemmaCount: number
  tokenCount: number
}

export interface IVerbFormDetail extends IVerbForm {
  examples: {
    id: string
    arabic: string
    uz: string | null
    frequency: number
    root: { radicals: string; meaningUz: string | null } | null
  }[]
}

export interface IRootClass {
  id: string
  code: RootClassCode
  nameAr: string
  nameUz: string
  position: number
  definitionUz: string
  ruleUz: string
  exampleRoot: string | null
  exampleNote: string | null
  rootCount: number
  tokenCount: number
}

export interface IRootClassDetail extends IRootClass {
  roots: { id: string; radicals: string; meaningUz: string | null; occurrenceCount: number }[]
}

export interface IDerivation {
  available: boolean
  challenge: {
    wordId: string
    arabic: string
    frequency: number
    root: { radicals: string; meaning: string | null }
    pattern: { wazn: string; meaning: string | null }
    answer: { uz: string | null; ru: string | null; en: string | null }
  } | null
  distractors: string[]
}
