import { cn } from '@topcoder/lib'
import { Fragment, type ReactNode } from 'react'

// Arabic, its supplements and the presentation forms. U+200F is the right-to-left
// mark, which sits inside Arabic runs and must not break them.
const ARABIC_CHARS = '\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF'
const ARABIC_RUN = new RegExp(`([${ARABIC_CHARS}][${ARABIC_CHARS}\\s\\u200F]*)`, 'g')
const BOLD = /\*\*([^*]+)\*\*/g

/** Wraps Arabic runs so they get the Amiri face and right-to-left flow inside Latin prose. */
function withArabic(text: string, keyPrefix: string): ReactNode[] {
  return text.split(ARABIC_RUN).map((chunk, index) => {
    if (!chunk) return null
    const key = `${keyPrefix}-${index}`

    // Odd indices are the captured Arabic runs.
    if (index % 2 === 1) {
      return (
        <span key={key} dir="rtl" className="font-arabic text-[1.15em] leading-relaxed">
          {chunk}
        </span>
      )
    }
    return <Fragment key={key}>{chunk}</Fragment>
  })
}

function withBold(text: string, keyPrefix: string): ReactNode[] {
  return text.split(BOLD).map((chunk, index) => {
    if (!chunk) return null
    const key = `${keyPrefix}-b${index}`

    if (index % 2 === 1) {
      return (
        <strong key={key} className="font-semibold text-foreground">
          {withArabic(chunk, key)}
        </strong>
      )
    }
    return <Fragment key={key}>{withArabic(chunk, key)}</Fragment>
  })
}

interface RichTextProps {
  /** Plain text using blank lines for paragraphs and **double asterisks** for emphasis. */
  children: string
  className?: string
}

/**
 * Renders the curriculum explanations. They are stored as plain text with two
 * conventions only — blank lines separate paragraphs and `**` marks emphasis —
 * so no markdown parser is pulled into the bundle for them.
 */
export function RichText({ children, className }: RichTextProps) {
  const blocks = children.split(/\n{2,}/).filter((block) => block.trim())

  return (
    <div className={cn('space-y-3 text-sm leading-relaxed text-muted-foreground', className)}>
      {blocks.map((block, index) => {
        const lines = block.split('\n').filter(Boolean)
        const isList = lines.every((line) => line.trimStart().startsWith('- '))

        if (isList) {
          return (
            <ul key={index} className="ml-4 list-disc space-y-1">
              {lines.map((line, lineIndex) => (
                <li key={lineIndex}>{withBold(line.trimStart().slice(2), `${index}-${lineIndex}`)}</li>
              ))}
            </ul>
          )
        }

        return (
          <p key={index}>
            {lines.map((line, lineIndex) => (
              <Fragment key={lineIndex}>
                {lineIndex > 0 && <br />}
                {withBold(line, `${index}-${lineIndex}`)}
              </Fragment>
            ))}
          </p>
        )
      })}
    </div>
  )
}
