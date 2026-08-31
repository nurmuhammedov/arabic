export interface IRootRef {
  id: string
  radicals: string
  meaningUz: string | null
}

export interface IPatternRef {
  id: string
  wazn: string
  meaningUz: string | null
}

export interface IWord {
  id: string
  arabic: string
  arabicPlain: string
  transcription: string | null
  uz: string | null
  ru: string | null
  en: string | null
  description: string | null
  pos: string
  verbForm: number | null
  frequency: number
  frequencyRank: number | null
  cumulativeCoverage: number | null
  glossStatus: string
  root: IRootRef | null
  pattern: IPatternRef | null
}

export interface IOccurrence {
  sura: number
  ayah: number
  wordIndex: number
  surfaceForm: string
  text: string
}

export interface IWordDetail extends IWord {
  occurrences: IOccurrence[]
  family: Pick<IWord, 'id' | 'arabic' | 'transcription' | 'uz' | 'ru' | 'en' | 'frequency'>[]
}
