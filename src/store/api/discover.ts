import { baseApi } from "./base.ts";

interface bannerType {
    banners: any[]
}

interface hotRecommendType {
    result : any[]
}

const discoverApi = baseApi.injectEndpoints({
    endpoints:( builder ) => ({
        //  query<a,b>  a 是返回值的类型，b 是传给后端的类型
        getBannerData: builder.query<bannerType['banners'], void>({
            query: () => '/banner',
            //  响应拦截器
            transformResponse(response: { banners: bannerType['banners'] }) {
                return response.banners
            }
        }),
        getHotRecommendData: builder.query<hotRecommendType['result'], number>({
            query: ( limit:number ) => `/personalized/${limit}`,
            transformResponse(response: { result: hotRecommendType['result'] } ) {
                return response.result
            }
        })
    })
})

export const {
    useGetBannerDataQuery,
    useGetHotRecommendDataQuery
} = discoverApi
