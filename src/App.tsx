import {useRoutes} from "react-router-dom";
import {routes} from "@/route/route.tsx";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Player from "@/components/player";
import {useThunkDispatch} from "@/store/hooks.ts";
import {FetchCurrentSong} from "@/store/api/play/store.ts";
import {useEffect} from "react";
import {useGetSongDetailDataQuery, useGetSongLyricDataQuery} from "@/store/api/play/playApi.ts";

function App() {
    const { data: songDetailData } = useGetSongDetailDataQuery(4877413)
    const { data: songLyricData } = useGetSongLyricDataQuery(4877413)
    const dispatch = useThunkDispatch()
    useEffect(() => {
        if ( songDetailData &&  songLyricData){
            dispatch(FetchCurrentSong({songId:4877413,songDetailData,songLyricData}))
        }
    }, [songDetailData,songLyricData])
    return (
        <>
            <Header/>
            {useRoutes(routes)}
            <Footer/>
            <Player/>
        </>
    )
}

export default App
