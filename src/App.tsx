import {useRoutes} from "react-router-dom";
import {routes} from "@/route/route.tsx";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Player from "@/components/player";
import {useEffect} from "react";
import {apiGetSongDetail, apiGetSongLyric} from "@/store/api/play/fetchService.ts";
import {FetchCurrentSong} from "@/store/api/play/store.ts";
import {useThunkDispatch} from "@/store/hooks.ts";

function App() {
    const dispatch = useThunkDispatch()
    useEffect(()=>{
        const fn = async (songId:number) =>{
            const songDetail = await apiGetSongDetail(songId)
            const songLyric = await apiGetSongLyric(songId)
            dispatch(FetchCurrentSong({
                songId,
                songDetailData:songDetail[0],
                songLyricData:songLyric }
            ))
        }
        fn(2049512697)
    })
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
