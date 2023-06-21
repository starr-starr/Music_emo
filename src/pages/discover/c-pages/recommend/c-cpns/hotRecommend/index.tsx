import { memo }  from "react";
import type { FC,ReactNode } from "react";
import MusicListHeader from "@/components/musicListHeader";
import { useGetHotRecommendDataQuery } from "@/store/api/discover.ts";
import MusicListItem from "@/components/MusicListItem";
import { useRenderSuccess } from "@/hooks/useRenderSuccessData.tsx";

interface MyProps {
    children? : ReactNode
}
const HotRecommendItem = ( { data }: { data:any[] } ) => {
    return (
        <>
            <MusicListHeader  title="热门推荐" keyword={["华语","流行","摇滚","民谣","电子"]} linkplace="/discover/playlist"/>
            {
                data && data.map( item => {
                    return <MusicListItem key={item.id} itemData={item} />
                })
            }
        </>
    )
}

const HotRecommend: FC<MyProps> = memo(() => {
    const { data,isSuccess } = useGetHotRecommendDataQuery(30)
    console.log(isSuccess);

    return(
        <>
            {useRenderSuccess(isSuccess,data && <HotRecommendItem data={data}/>)}
        </>
    )
})

export default HotRecommend
