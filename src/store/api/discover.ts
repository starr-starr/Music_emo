import { baseApi } from "./base.ts";

interface bannerType {
    banners: any[]
}

interface hotRecommendType {
    result: any[]
}

interface newAlbumType {
    albums: any[]
}

interface signedSingerType {
    artists: any[]
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
            query: ( limit:number ) => `/personalized/?limit=${limit}`,
            transformResponse(response: { result: hotRecommendType['result'] } ) {
                return response.result
            }
        }),
        getNewAlbumData: builder.query<newAlbumType['albums'],void>({
            query: () => '/album/newest',
            transformResponse(response: { albums: newAlbumType['albums'] } ) {
                return response.albums
            }
        }),
        getSignedSingerData: builder.query<signedSingerType['artists'],number>({
            query: ( limit ) => `/artist/list?limit=${limit}`,
            transformResponse(response: { artists: signedSingerType['artists'] } ) {
                return response.artists
            }
        })

    })
})

export const {
    useGetBannerDataQuery,
    useGetHotRecommendDataQuery,
    useGetNewAlbumDataQuery,
    useGetSignedSingerDataQuery
} = discoverApi
