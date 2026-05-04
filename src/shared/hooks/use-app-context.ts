import { AppContext } from '@topcoder/contexts'
import { useContext } from 'react'

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('Hook used out of the AppContextProvider')
  }
  return context
}
