import { memo }  from "react";
import type { FC,ReactNode } from "react";
import MusicListHeader from "@/components/musicListHeader";
import { useGetHotRecommendDataQuery } from "@/store/api/discover.ts";

interface MyProps {
    children? : ReactNode
}
const HotRecommend: FC<MyProps> = memo(() => {
    const { data } = useGetHotRecommendDataQuery(30)
    return(
        <>
            <MusicListHeader  title="热门推荐" keyword={["华语","流行","摇滚","民谣","电子"]} linkplace="/discover/playlist"/>

        </>
    )
})

export default HotRecommend
