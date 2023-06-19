import {
    configureStore,
    combineReducers,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';
import { baseApi } from './api/base';

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
});

// 中间件集合
const middlewareHandler = (getDefaultMiddleware: any) => {
    const middlewareList = [...getDefaultMiddleware()];
    middlewareList.push(baseApi.middleware);
    return middlewareList;
};

//API slice会包含自动生成的redux reducer和一个自定义中间件
export const rootStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        middlewareHandler(getDefaultMiddleware),
});

setupListeners(rootStore.dispatch);

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof rootStore.getState>;
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootStore.dispatch

