export const ARABIC_MAP: Record<string, string> = {
  a: 'َ',
  aa: 'ا',
  i: 'ِ',
  ii: 'ي',
  ee: 'ي',
  u: 'ُ',
  uu: 'و',
  oo: 'و',

  b: 'ب',
  t: 'ت',
  j: 'ج',
  d: 'د',
  r: 'ر',
  z: 'ز',
  s: 'س',
  f: 'ف',
  q: 'ق',
  k: 'ك',
  l: 'ل',
  m: 'م',
  n: 'ن',
  h: 'ح',
  w: 'و',
  v: 'و',
  y: 'ي',

  sh: 'ش',
  kh: 'خ',
  gh: 'غ',
  th: 'ث',
  dh: 'ذ',

  سh: 'ش',
  كh: 'خ',
  تh: 'ث',
  دh: 'ذ',
  غh: 'غ',
  حh: 'حه',
  'َa': 'َا',
  'ِi': 'ِي',
  'ُu': 'ُو',
  'َo': 'َا',
  'ِo': 'ِي',
  'ُo': 'ُو',
  ءe: 'ي',
  g: 'غ',

  H: 'ه',
  D: 'ض',
  T: 'ط',
  Z: 'ظ',
  A: 'أ',
  U: 'أ',
  I: 'إ',
  Y: 'ى',
  E: 'ئ',
  W: 'ؤ',
  M: 'آ',
  L: 'لا',

  p: 'ة',
  e: 'ء',
  o: 'َ',
  x: 'خ',
  c: 'ص',
  "'": 'ع',

  '1': 'ً',
  '2': 'ٌ',
  '3': 'ٍ',
  '4': 'ّ',
  '0': 'ْ',
  '5': 'ٰ',
  '6': 'ٔ',
  '7': 'ٕ',
  '8': 'ٱ',
  '9': 'ـ',
}

export const parseArabicText = (text: string): string => {
  let result = ''
  let i = 0

  while (i < text.length) {
    const twoChars = text.substring(i, i + 2)
    const oneChar = text.substring(i, i + 1)
    const oneCharLower = oneChar.toLowerCase()

    if (ARABIC_MAP[twoChars]) {
      result += ARABIC_MAP[twoChars]
      i += 2
      continue
    }

    const twoCharsLower = twoChars.toLowerCase()
    if (ARABIC_MAP[twoCharsLower]) {
      result += ARABIC_MAP[twoCharsLower]
      i += 2
      continue
    }

    const isDoubleLatin =
      twoChars.length === 2 &&
      twoChars[0].toLowerCase() === twoChars[1].toLowerCase() &&
      (ARABIC_MAP[oneChar] || ARABIC_MAP[oneCharLower]) &&
      !['a', 'i', 'u', 'o', 'e'].includes(oneCharLower)

    const isArabicLatinShadda =
      twoChars.length === 2 &&
      ARABIC_MAP[twoChars[1].toLowerCase()] === twoChars[0] &&
      !['a', 'i', 'u', 'o', 'e'].includes(twoChars[1].toLowerCase())

    if (isDoubleLatin) {
      const char = ARABIC_MAP[oneChar] || ARABIC_MAP[oneCharLower]
      result += char + 'ّ'
      i += 2
      continue
    }

    if (isArabicLatinShadda) {
      result += twoChars[0] + 'ّ'
      i += 2
      continue
    }

    const isArabicOrMark = /[\u0600-\u06FF\s]/.test(oneChar)
    if (isArabicOrMark) {
      result += oneChar
      i += 1
      continue
    }

    if (ARABIC_MAP[oneChar]) {
      result += ARABIC_MAP[oneChar]
      i += 1
    } else if (ARABIC_MAP[oneCharLower]) {
      result += ARABIC_MAP[oneCharLower]
      i += 1
    } else if (oneChar === ' ') {
      result += ' '
      i += 1
    } else {
      i += 1
    }
  }

  return result
}

export const isLatin = (char: string): boolean => {
  return /^[a-zA-Z0-9\s'"`~!@#$%^&*()_\-+=<>,.?/:;\\|{}[\]]*$/.test(char)
}
