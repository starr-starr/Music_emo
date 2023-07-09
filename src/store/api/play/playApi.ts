import { baseApi } from "@/store/api/base.ts";

interface songDetailType {
    songs: any[]
    privileges: any[]
}
type songDetailResponse = songDetailType[]

const playApi = baseApi.injectEndpoints({
    endpoints:(build)=>({
        getSongDetailData: build.query<songDetailResponse,number>({
            query: ( ids:number ) => `/song/detail?ids=${ids}`,
            transformResponse(response: { songs: songDetailType['songs'] } ) {
                return response.songs
            }
        }),
    })
})

export const {
    useGetSongDetailDataQuery
} = playApi
