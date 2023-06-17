import {useRoutes} from "react-router-dom";
import {routes} from "@/route/route.tsx";
import Header from "@/components/header";
import Footer from "@/components/footer";

function App() {

    return (
        <>
            <Header/>
            {useRoutes(routes)}
            <Footer/>
        </>
    )
}

export default App
