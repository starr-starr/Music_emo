import { memo }  from "react";
import type { FC,ReactNode } from "react";

import Swiper from "@/pages/discover/c-pages/recommend/c-cpns/swiper";

interface MyProps {
    children? : ReactNode
}
const Recommend: FC<MyProps> = memo(() => {
    return(
        <>
            <Swiper/>
        </>
    )
})

export default Recommend
