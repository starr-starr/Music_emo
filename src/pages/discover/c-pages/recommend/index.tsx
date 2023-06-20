import { memo }  from "react";
import type { FC,ReactNode } from "react";

import Swiper from "@/pages/discover/c-pages/recommend/c-cpns/swiper";
import HotRecommend from "@/pages/discover/c-pages/recommend/c-cpns/hotRecommend";

interface MyProps {
    children? : ReactNode
}
const Recommend: FC<MyProps> = memo(() => {
    return(
        <>
            <Swiper/>
            <div className='w-[980px] mx-auto my-0'>
                <HotRecommend/>
            </div>
        </>
    )
})

export default Recommend
