import { useAppDispatch } from '@topcoder/hooks'
import { allActions } from '@topcoder/store'
import { useMemo } from 'react'
import { bindActionCreators } from 'redux'

export const useActions = () => {
  const dispatch = useAppDispatch()
  return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
}
