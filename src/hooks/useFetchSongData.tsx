import {useGetSongDetailDataQuery, useGetSongLyricDataQuery} from "@/store/api/play/playApi.ts";
import {useThunkDispatch} from "@/store/hooks.ts";
import {useEffect} from "react";
import {FetchCurrentSong} from "@/store/api/play/store.ts";

export const useFetchSongData = (songId:number) => {
    const { data: songDetailData } = useGetSongDetailDataQuery(songId)
    const { data: songLyricData } = useGetSongLyricDataQuery(songId)
    const dispatch = useThunkDispatch()

    useEffect(() => {
        if (songDetailData && songLyricData) {
            dispatch(FetchCurrentSong({ songId, songDetailData, songLyricData }))
        }
    }, [songDetailData, songLyricData, dispatch, songId])
}
