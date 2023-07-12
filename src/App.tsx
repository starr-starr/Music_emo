import {useRoutes} from "react-router-dom";
import {routes} from "@/route/route.tsx";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Player from "@/components/player";
import {useFetchSongData} from "@/hooks/useFetchSongData.tsx";

function App() {
    useFetchSongData(2049512697)
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
