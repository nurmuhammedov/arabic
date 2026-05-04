import { Button, buttonVariants } from '@topcoder/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@topcoder/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@topcoder/components/ui/popover'
import { cn } from '@topcoder/lib'
import { TypeAny } from '@topcoder/types'
import { enGB, uz, uzCyrl } from 'date-fns/locale'
import { Check, ChevronLeft } from 'lucide-react'
import * as React from 'react'
import { DayButton, DayPicker, DropdownProps, getDefaultClassNames } from 'react-day-picker'
import { useTranslation } from 'react-i18next'

function CalendarDropdown({ value, onChange, options }: DropdownProps) {
  const selected = options?.find((i) => i.value === value)
  const [open, setOpen] = React.useState(false)
  const { t } = useTranslation(['form'])

  const handleChange = (newValue: string) => {
    const changeEvent = {
      target: { value: newValue },
    } as React.ChangeEvent<HTMLSelectElement>
    onChange?.(changeEvent)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'flex h-7 cursor-pointer items-center justify-between rounded-md px-2 py-1 text-sm font-medium focus:outline-none',
            'bg-transparent text-foreground',
            'border border-transparent hover:bg-accent hover:text-accent-foreground',
            open && 'bg-accent text-accent-foreground'
          )}
        >
          {selected?.label}
          <ChevronLeft className={cn('ml-1 h-4 w-4 rotate-[-90deg] opacity-50 transition', open && 'rotate-90')} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="z-[60] w-[140px] p-0" align="center">
        <Command>
          <CommandInput hideIcon={true} placeholder="Qidirish..." className="h-9 pl-5" />
          <CommandList className="max-h-[200px]">
            <CommandEmpty>{t('noting_found')}</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => {
                const label = String(option?.label as string | number)
                const optionValue = option?.value

                return (
                  <CommandItem
                    key={String(optionValue)}
                    value={label}
                    onSelect={() => {
                      if (optionValue !== undefined && optionValue !== null) {
                        handleChange(String(optionValue))
                      }
                    }}
                    className="pl-1 pr-1"
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 shrink-0 items-center justify-center',
                        value === optionValue ? 'opacity-100' : 'opacity-0'
                      )}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                    {label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-end=true]:bg-primary data-[range-middle=true]:bg-accent data-[range-start=true]:bg-primary data-[selected-single=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:text-accent-foreground data-[range-start=true]:text-primary-foreground data-[selected-single=true]:text-primary-foreground group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[0px] group-data-[focused=true]/day:ring-ring/50 [&>span]:text-xs [&>span]:opacity-70',
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'dropdown',
  buttonVariant = 'ghost',
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
}) {
  const defaultClassNames = getDefaultClassNames()
  const { i18n } = useTranslation()
  const currentLocale = i18n?.language === 'uz' ? uz : i18n?.language === 'uzb' ? uzCyrl : enGB

  const selected = (props as TypeAny).selected
  const defaultMonth = selected instanceof Date ? selected : selected?.from

  return (
    <DayPicker
      locale={props.locale || currentLocale}
      showOutsideDays={showOutsideDays}
      fromYear={1900}
      toYear={new Date().getFullYear() + 100}
      defaultMonth={defaultMonth}
      className={cn(
        'group/calendar bg-white p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn('relative flex flex-col gap-4 md:flex-row', defaultClassNames.months),
        month: cn('flex w-full flex-col gap-4', defaultClassNames.month),
        nav: cn('absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1', defaultClassNames.nav),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50',
          defaultClassNames.button_next
        ),
        month_caption: cn(
          'flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]',
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          'flex h-[--cell-size] w-full items-center justify-center gap-3 text-sm font-medium',
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          'relative rounded-md border border-transparent cursor-pointer transition-colors',
          'hover:bg-accent',
          'focus-within:ring-1 focus-within:ring-ring',
          defaultClassNames.dropdown_root
        ),
        dropdown: cn('bg-popover absolute inset-0 opacity-0', defaultClassNames.dropdown),
        caption_label: cn(
          'select-none font-medium',
          captionLayout === 'label'
            ? 'text-sm'
            : '[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5',
          defaultClassNames.caption_label
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal',
          defaultClassNames.weekday
        ),
        week: cn('mt-2 flex w-full', defaultClassNames.week),
        week_number_header: cn('w-[--cell-size] select-none', defaultClassNames.week_number_header),
        week_number: cn('text-muted-foreground select-none text-[0.8rem]', defaultClassNames.week_number),
        day: cn(
          'group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md',
          defaultClassNames.day
        ),
        range_start: cn('bg-accent rounded-l-md', defaultClassNames.range_start),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('bg-accent rounded-r-md', defaultClassNames.range_end),
        today: cn(
          'bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none',
          defaultClassNames.today
        ),
        outside: cn('text-muted-foreground aria-selected:text-muted-foreground', defaultClassNames.outside),
        disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />
        },
        DayButton: CalendarDayButton,
        // Dropdown: CalendarDropdown,
        ...components,
      }}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton, CalendarDropdown }
