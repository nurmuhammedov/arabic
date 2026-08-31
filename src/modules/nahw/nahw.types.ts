export enum IrabCase {
  NOMINATIVE = 'NOMINATIVE',
  ACCUSATIVE = 'ACCUSATIVE',
  GENITIVE = 'GENITIVE',
  JUSSIVE = 'JUSSIVE',
  SUBJUNCTIVE = 'SUBJUNCTIVE',
  INDICATIVE = 'INDICATIVE',
}

export enum IrabCause {
  PREPOSITION = 'PREPOSITION',
  IDAFA = 'IDAFA',
  INNA = 'INNA',
  OBJECT = 'OBJECT',
  SUBJECT = 'SUBJECT',
  TOPIC = 'TOPIC',
  ADJECTIVE = 'ADJECTIVE',
  CONJUNCTION = 'CONJUNCTION',
  UNKNOWN = 'UNKNOWN',
}

export enum NahwTopicKind {
  CASE = 'CASE',
  SENTENCE = 'SENTENCE',
  STRUCTURE = 'STRUCTURE',
  ROLE = 'ROLE',
}

export interface INahwTopic {
  id: string
  slug: string
  titleAr: string
  titleUz: string
  kind: NahwTopicKind
  position: number
  summaryUz: string
  bodyUz: string
  exampleSura: number | null
  exampleAyah: number | null
  exampleNoteUz: string | null
}

export interface INahwTopicDetail extends INahwTopic {
  example: { sura: number; ayah: number; text: string } | null
}

export interface IIrabChallenge {
  id: string
  sura: number
  ayah: number
  wordIndex: number
  surfaceForm: string
  irabCase: IrabCase
  cause: IrabCause
  triggerForm: string | null
  text: string | null
}

export interface ICauseCount {
  cause: IrabCause
  count: number
}
