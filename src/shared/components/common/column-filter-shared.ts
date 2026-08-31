export const ICON_STYLE = 'absolute left-2 top-1/2 -translate-y-1/2 text-neutral-400 size-4 pointer-events-none'
export const CLEAR_BUTTON_STYLE =
  'absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer flex items-center justify-center bg-white'
export const WRAPPER_STYLE = 'relative w-full border-none bg-white transition-colors h-8'
export const TRIGGER_CONTENT_STYLE =
  'w-full h-full flex items-center px-0 pl-8 pr-6 text-sm font-normal text-black bg-transparent outline-none cursor-pointer overflow-hidden'

export interface FilterSubProps {
  filterKey: string
  filterParams?: any
}
