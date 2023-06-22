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
            <div className={`w-[980px] mx-auto my-0 border bg-[url(${('@/assets/img/wrap-bg.png')}] flex border-solid border-[#d3d3d3]`}>
                <div className='p-[20px] w-[729px]'>
                    <HotRecommend/>
                </div>
            </div>
        </>
    )
})

export default Recommend
