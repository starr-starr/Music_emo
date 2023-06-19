import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_BASE_URL
export const baseApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl }),
    reducerPath: 'baseApi',
    keepUnusedDataFor: 5 * 60,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
});
