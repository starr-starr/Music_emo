import {useRoutes} from "react-router-dom";
import {routes} from "@/route/route.tsx";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Player from "@/components/player";

function App() {

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
