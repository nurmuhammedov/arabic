import type { AppDispatch, TypeRootState } from '@topcoder/store'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<TypeRootState> = useSelector
