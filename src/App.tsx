import { useRoutes } from "react-router-dom";
import {routes} from "@/route/route.tsx";
function App() {

  return (
    <>
        {useRoutes(routes)}
    </>
  )
}

export default App
