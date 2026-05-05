export const ARABIC_MAP: Record<string, string> = {
  // Harakatlar va Cho'ziq unlilar (Double typing logic)
  a: 'َ', // Fatha
  aa: 'ا', // Alif
  i: 'ِ', // Kasra
  ii: 'ي', // Yo
  ee: 'ي', // Yo muqobil
  u: 'ُ', // Damma
  uu: 'و', // Vov
  oo: 'و', // Vov muqobil

  // Oddiy undoshlar
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
  h: 'ه',
  w: 'و',
  v: 'و',
  y: 'ي',

  // Qo'sh harflar (Combinations)
  sh: 'ش',
  kh: 'خ',
  gh: 'غ',
  th: 'ث',
  dh: 'ذ',

  // Qalin harflar (Shift + Harf)
  H: 'ح',
  S: 'ص',
  D: 'ض',
  T: 'ط',
  Z: 'ظ',
  A: 'أ',
  I: 'إ',

  // Maxsus belgilar
  p: 'ة', // Ta marbuta
  e: 'ء', // Hamza
  o: 'ْ', // Sukun (User request)
  x: 'خ', // Xo muqobil
  c: 'ع',
  "'": 'ع',

  // Raqamli harakatlar va belgilar
  '4': 'ّ', // Shadda
  '5': 'ْ', // Sukun
  '6': 'ً', // Tanvin fatha
  '7': 'ٌ', // Tanvin damma
  '8': 'ٍ', // Tanvin kasra
}

/**
 * Lotin harflarini arabchaga o'giruvchi funksiya.
 * Ikki harfli kombinatsiyalarni (sh, aa, kh) birinchi bo'lib tekshiradi.
 */
export const parseArabicText = (text: string): string => {
  let result = ''
  let i = 0

  while (i < text.length) {
    const twoChars = text.substring(i, i + 2)
    const oneChar = text.substring(i, i + 1)

    if (ARABIC_MAP[twoChars]) {
      result += ARABIC_MAP[twoChars]
      i += 2
    } else if (ARABIC_MAP[oneChar]) {
      result += ARABIC_MAP[oneChar]
      i += 1
    } else {
      result += oneChar
      i += 1
    }
  }

  return result
}

/**
 * Faqat Lotin harflari, raqamlar va umumiy belgilarni tekshirish uchun.
 */
export const isLatin = (char: string): boolean => {
  return /^[a-zA-Z0-9\s'"`~!@#$%^&*()_\-+=<>,.?/:;\\|{}[\]]*$/.test(char)
}
