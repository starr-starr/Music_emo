import { baseApi } from "./base.ts";

interface bannerType {
    banners: any[]
}

const discoverApi = baseApi.injectEndpoints({
    endpoints:( builder ) => ({
        getBannerData: builder.query<Promise<bannerType>, void>({
            query: () => '/banner',
            //  响应拦截器
            transformResponse(response: { banners: Promise<bannerType> }) {
                return response.banners
            }
        })
    })
})

export const {
    useGetBannerDataQuery
} = discoverApi
