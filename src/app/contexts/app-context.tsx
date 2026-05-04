import { useActions } from '@topcoder/hooks'
import { getLocalStorage } from '@topcoder/lib'
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from 'react'

interface IAppContext {
  isSideBarOpen: boolean | null
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
}

const AppContext = createContext<IAppContext | undefined>(undefined)

function AppContextProvider({ children }: PropsWithChildren) {
  const [isSideBarOpen, setIsSidebarOpen] = useState<boolean>(Boolean(getLocalStorage<boolean>('isSideBarOpen')))
  const { me } = useActions()

  useEffect(() => {
    me()
  }, [me])

  return <AppContext.Provider value={{ isSideBarOpen, setIsSidebarOpen }}>{children}</AppContext.Provider>
}

export { AppContext, AppContextProvider }
