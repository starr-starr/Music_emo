import { memo }  from "react";
import type { FC,ReactNode } from "react";
import MusicListHeader from "@/components/musicListHeader";

interface MyProps {
    children? : ReactNode
}
const HotRecommend: FC<MyProps> = memo(() => {
    return(
        <>
            <MusicListHeader  title="热门推荐" keyword={["华语","流行","摇滚","民谣","电子"]} linkplace="/discover/playlist"/>
        </>
    )
})

export default HotRecommend
