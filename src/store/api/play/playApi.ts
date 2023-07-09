import { baseApi } from "@/store/api/base.ts";

interface songDetailType {
    songs: any[]
}
interface LyricType {
    lrc: any
}
const playApi = baseApi.injectEndpoints({
    endpoints:(build)=>({
        getSongDetailData: build.query<songDetailType['songs'],number>({
            query: ( ids:number ) => `/song/detail?ids=${ids}`,
            transformResponse(response: { songs: songDetailType['songs'] } ) {
                return response.songs
            }
        }),
        getSongLyricData: build.query<LyricType['lrc'],number>({
            query: ( id:number ) => `/lyric?id=${id}`,
            transformResponse(response: { lrc: LyricType['lrc'] } ) {
                return response.lrc.lyric
            }
        }),
    })
})

export const {
    useGetSongDetailDataQuery,
    useGetSongLyricDataQuery
} = playApi
