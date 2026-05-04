import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@topcoder/components/ui/accordion'
import { cn } from '@topcoder/lib'
import { FC, ReactNode } from 'react'

import type { DetailCardAccordionItemProps, DetailCardAccordionProps } from '../model/detail-card-types'

export const DetailCardAccordion: FC<DetailCardAccordionProps> & {
  Item: FC<DetailCardAccordionItemProps>
} = ({ children, defaultValue = [] }) => {
  return (
    <Accordion
      type="multiple"
      defaultValue={Array.isArray(defaultValue) ? defaultValue : []}
      className="flex w-full flex-col rounded-lg py-0.5"
    >
      {children}
    </Accordion>
  )
}

DetailCardAccordion.Item = ({ value, title, children, className, icon }) => {
  return (
    <AccordionItem
      value={value}
      className={cn('mb-4 overflow-hidden rounded-xl border border-gray-100 bg-white', className)}
    >
      <AccordionTrigger className="items-center bg-[#E2EAFA] px-4 py-3">
        <div className="flex items-center gap-3 font-semibold text-blue-700 sm:text-base">
          {icon && (
            <span className="flex items-center justify-center rounded-lg bg-blue-100 p-1.5 text-blue-700 shadow-sm">
              {icon as ReactNode}
            </span>
          )}
          <span className="leading-none text-[#234DB9]">{title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="bg-white px-2 py-2">{children}</AccordionContent>
    </AccordionItem>
  )
}
