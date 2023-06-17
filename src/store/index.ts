import {
    configureStore,
    combineReducers,
} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query/react';
import {baseApi} from './api/base';

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
});

// 中间件集合
const middlewareHandler = (getDefaultMiddleware: any) => {
    const middlewareList = [...getDefaultMiddleware()];
    return middlewareList;
};

//API slice会包含自动生成的redux reducer和一个自定义中间件
export const rootStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        middlewareHandler(getDefaultMiddleware),
});

export type RootState = ReturnType<typeof rootStore.getState>;

setupListeners(rootStore.dispatch);
