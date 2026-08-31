import { bindActionCreators } from '@reduxjs/toolkit'
import { useAppDispatch } from '@topcoder/hooks'
import { allActions } from '@topcoder/store'
import { useMemo } from 'react'

export const useActions = () => {
  const dispatch = useAppDispatch()
  return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
}
