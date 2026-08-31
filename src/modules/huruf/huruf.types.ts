export enum ParticleCategory {
  PREPOSITION = 'PREPOSITION',
  CONJUNCTION = 'CONJUNCTION',
  NEGATION = 'NEGATION',
  CONDITION = 'CONDITION',
  EMPHASIS = 'EMPHASIS',
  INTERROGATIVE = 'INTERROGATIVE',
  PRONOUN = 'PRONOUN',
  DEMONSTRATIVE = 'DEMONSTRATIVE',
  RELATIVE = 'RELATIVE',
  EXCEPTION = 'EXCEPTION',
  VOCATIVE = 'VOCATIVE',
  FUTURE = 'FUTURE',
  ADVERB = 'ADVERB',
  DEFINITE_ARTICLE = 'DEFINITE_ARTICLE',
  SUBORDINATOR = 'SUBORDINATOR',
  ANSWER = 'ANSWER',
  OTHER = 'OTHER',
}

export enum Attachment {
  STANDALONE = 'STANDALONE',
  PREFIX = 'PREFIX',
  SUFFIX = 'SUFFIX',
}

export enum GrammarEffect {
  GENITIVE = 'GENITIVE',
  ACCUSATIVE_NOUN = 'ACCUSATIVE_NOUN',
  NOMINATIVE_NOUN = 'NOMINATIVE_NOUN',
  ACCUSATIVE_VERB = 'ACCUSATIVE_VERB',
  JUSSIVE_VERB = 'JUSSIVE_VERB',
  NONE = 'NONE',
}

export interface IParticle {
  id: string
  arabic: string
  transliteration: string | null
  category: ParticleCategory
  attachment: Attachment
  grammarEffect: GrammarEffect
  shortUz: string | null
  meaningUz: string
  effectNoteUz: string | null
  exampleSura: number | null
  exampleAyah: number | null
  exampleNoteUz: string | null
  frequency: number
}

export interface IParticleGroup {
  category: ParticleCategory
  particles: IParticle[]
  frequency: number
}

export interface IParticleDetail extends IParticle {
  example: { sura: number; ayah: number; text: string } | null
}
