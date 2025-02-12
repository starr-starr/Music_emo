import { TypedUseSelectorHook, useDispatch, useSelector,shallowEqual } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "@reduxjs/toolkit";

// 在整个应用程序中使用，而不是简单的 `useDispatch` 和 `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const shallowEqualApp = shallowEqual
export const useThunkDispatch = () => useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();

