import {memo, useEffect} from "react";
import type { FC,ReactNode } from "react";
import {getImageSize} from "@/utils/formatNumber.ts";
import {useThunkDispatch} from "@/store/hooks.ts";
import {FetchCurrentSong} from "@/store/api/play/store.ts";
import {apiGetSongDetail, apiGetSongLyric} from "@/store/api/play/fetchService.ts";

interface MyProps {
    children? : ReactNode
    itemData :any
}
const RankingItem: FC<MyProps> = memo(({ itemData }) => {
    const { tracks = [] } = itemData
    const dispatch = useThunkDispatch()
    const handleClickSong = async (songId:number) =>{
        const songDetail = await apiGetSongDetail(songId)
        const songLyric = await apiGetSongLyric(songId)
        dispatch(FetchCurrentSong({
            songId,
            songDetailData:songDetail[0],
            songLyricData:songLyric }
        ))
    }
    return(
        <div className="w-[230px] last:w-[228px]">
            <div className="h-[100px] flex ml-5 mr-0 mt-5 mb-0">
                <div className="relative w-[80px] h-[80px]">
                    <img src={getImageSize(itemData.coverImgUrl, 80)} alt="" className="w-[80px] h-[80px]" />
                    <a href="" className="sprite_cover"></a>
                </div>
                <div className="ml-2.5 mr-0 mt-[5px] mb-0">
                    <div className="text-sm font-bold text-[#333]">{itemData.name}</div>
                    <div>
                        <button
                            style={{backgroundPosition:"-267px -205px"}}
                            className="rankingPlay decorateBtn inline-block indent-[-9999px] w-[22px] h-[22px] cursor-pointer ml-0 mr-2.5 mt-2 mb-0" ></button>
                        <button
                            style={{backgroundPosition:"-300px -205px"}}
                            className="rankingCollect decorateBtn inline-block indent-[-9999px] w-[22px] h-[22px] cursor-pointer ml-0 mr-2.5 mt-2 mb-0"></button>
                    </div>
                </div>
            </div>
            <div className="list text-[12px]">
                {tracks.slice(0, 10).map((item: any, index: number) => {
                    // console.log(item);
                    return (
                        <div className="group relative flex items-center h-8" key={item.id}>
                            <div className={`index w-[35px] text-center text-base ml-2.5 ${index > 2 ?'' :'text-[#c10d0c]'}`}>{index + 1}</div>
                            <div className="text-black w-[170px] h-[17px] leading-[17px] flex justify-between">
                                <div className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer hover:underline">{item.name}</div>
                                <div className="items-center w-[82px] hidden group-hover:block">
                                    <button
                                        style={{backgroundPosition:"-267px -268px"}}
                                        className="decorateBtn w-[17px] h-[17px] cursor-pointer ml-2"
                                        onClick={()=>{handleClickSong(item.id)}}
                                    ></button>
                                    <button
                                        style={{backgroundPosition:"0 -700px"}}
                                        className="rankingIcon relative top-[2px] w-[17px] h-[17px] cursor-pointer ml-2"></button>
                                    <button
                                        style={{backgroundPosition:"-297px -268px"}}
                                        className="decorateBtn w-[17px] h-[17px] cursor-pointer ml-2"></button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex items-center justify-end h-8 pr-5 text-[12px]">
                <a href="/discover/ranking">查看全部 &gt;</a>
            </div>
        </div>
    )
})

export default RankingItem
