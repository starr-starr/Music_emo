import { memo }  from "react";
import type { FC,ReactNode } from "react";
import MusicListHeader from "@/components/musicListHeader";
import { useGetHotRecommendDataQuery } from "@/store/api/discover.ts";
import MusicListItem from "@/components/MusicListItem";
import { useRenderSuccess } from "@/hooks/useRenderSuccessData.tsx";

interface MyProps {
    children? : ReactNode
}

const HotRecommend: FC<MyProps> = memo(() => {
    const { data,isSuccess } = useGetHotRecommendDataQuery(8)
    const HotRecommendItem = memo(() => {
        return (
            <div className='mt-[10px]'>
                <MusicListHeader  title="热门推荐" keyword={["华语","流行","摇滚","民谣","电子"]} linkplace="/discover/playlist"/>
                <div className='flex justify-between flex-wrap'>
                    {
                        data && data.map( item => {
                            return <MusicListItem key={item.id} itemData={item} />
                        })
                    }
                </div>
            </div>
        )
    })
    return(
        <>
            {useRenderSuccess(isSuccess,<HotRecommendItem/>)}
        </>
    )
})

export default HotRecommend
