import { memo }  from "react";
import type { FC,ReactNode } from "react";
import {Outlet} from "react-router-dom";

import SubNav from "@/pages/discover/c-cpns/subNav";

interface MyProps {
    children? : ReactNode
}
const Discover: FC<MyProps> = memo(() => {
    return(
        <>
            <SubNav/>
            <Outlet/>
        </>
    )
})

export default Discover
