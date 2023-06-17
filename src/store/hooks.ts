import {TypedUseSelectorHook, useDispatch, useSelector, shallowEqual} from 'react-redux'
import type {RootState, AppDispatch} from '@/store'

// 在整个应用程序中使用，而不是简单的 `useDispatch` 和 `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
//  防止使用 shallowEqual 时重新从 react-redux 导入
export const shallowEqualApp = shallowEqual
