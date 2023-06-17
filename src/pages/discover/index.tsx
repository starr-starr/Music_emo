import { memo }  from "react";
import type { FC,ReactNode } from "react";
import {Outlet} from "react-router-dom";

interface MyProps {
    children? : ReactNode
}
const Discover: FC<MyProps> = memo(() => {
    return(
        <>
            <div>Discover</div>
            <Outlet/>
        </>
    )
})

export default Discover
