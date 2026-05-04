import { ReactNode } from 'react'

export interface DetailCardAccordionProps {
  children?: ReactNode
  defaultValue?: string | string[]
}

export interface DetailCardAccordionItemProps {
  value: string
  title: string
  children: ReactNode
  className?: string
  icon?: ReactNode
}
