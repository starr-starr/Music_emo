import { baseApi } from "@/store/api/base.ts";

interface songDetailType {
    songs: any[]
}
interface lyricType {
    lrc: any
}
interface SongUrlType {
    data: any
}
const playApi = baseApi.injectEndpoints({
    endpoints:(build)=>({
        getSongDetailData: build.query<songDetailType['songs'],number>({
            query: ( ids:number ) => `/song/detail?ids=${ids}`,
            transformResponse(response: { songs: songDetailType['songs'] } ) {
                return response.songs
            }
        }),
        getSongLyricData: build.query<lyricType['lrc'],number>({
            query: ( id:number ) => `/lyric?id=${id}`,
            transformResponse(response: { lrc: lyricType['lrc'] } ) {
                return response.lrc.lyric
            }
        }),
        getSongUrlData: build.query<SongUrlType['data'],number>({
            query: ( id:number ) => `/song/url?id=${id}`,
            transformResponse(response: { data: SongUrlType['data'] } ) {
                return response.data[0].url
            }
        }),
    })
})

export const {
    useGetSongDetailDataQuery,
    useGetSongLyricDataQuery,
    useGetSongUrlDataQuery
} = playApi
