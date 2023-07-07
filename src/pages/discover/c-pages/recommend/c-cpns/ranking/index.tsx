import { memo }  from "react";
import type { FC,ReactNode } from "react";
import MusicListHeader from "@/components/musicListHeader";
import RankingItem from "@/components/rankingItem";
import {useGetRankingDataQuery} from "@/store/api/discover.ts";

interface MyProps {
    children? : ReactNode
}

const Ranking: FC<MyProps> = memo(() => {
    const { data: risingRanking} = useGetRankingDataQuery(19723756)
    const { data: newSongRanking} = useGetRankingDataQuery(3779629)
    const { data: originalRanking} = useGetRankingDataQuery(2884035)
    const RankingList = risingRanking && newSongRanking && originalRanking
        ? [risingRanking, newSongRanking, originalRanking]
        : null
    return(
        <div>
            <MusicListHeader title="榜单" linkplace="/discover/rank"/>
            <div className={`flex h-[472px] mt-5 rankingList`}>
                {
                    RankingList && RankingList.map((item,index) => {
                        return <RankingItem key={index} itemData={item} />
                })
                }
            </div>
        </div>
    )
})

export default Ranking
