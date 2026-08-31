const DIACRITICS = /[ؐ-ًؚ-ٰٟۖ-ۭـ]/g

/** Strip vowel marks and unify letter variants so a lemma matches its inflected form. */
export const stripArabic = (value: string): string =>
  value
    .replace(DIACRITICS, '')
    .replace(/[آأإٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')

/**
 * Splits an ayah into words and marks the ones carrying the studied form.
 * Matching ignores diacritics and attached particles, which is why it compares
 * stripped substrings rather than whole tokens.
 */
export const highlightAyah = (text: string, surfaceForm: string) => {
  const needle = stripArabic(surfaceForm)

  return text.split(/\s+/).map((token, index) => ({
    key: `${index}-${token}`,
    token,
    match: needle.length > 1 && stripArabic(token).includes(needle),
  }))
}
