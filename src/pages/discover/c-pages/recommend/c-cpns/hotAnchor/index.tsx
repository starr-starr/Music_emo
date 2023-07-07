import { memo }  from "react";
import type { FC,ReactNode } from "react";
import MusicListHeader from "@/components/musicListHeader";
import { hotAnchor } from '@/assets/data/hotAnchor.ts'

interface MyProps {
    children? : ReactNode
}
const HotAnchor: FC<MyProps> = memo(() => {
    return(
        <div className='p-[20px]'>
            <MusicListHeader title="热门主播" more='查看全部' linkplace="/discover/djradio" isDiscover={false} />
            <div className="mt-[20px]">
                {
                    hotAnchor.map((item) => {
                        return (
                            <div className="flex mb-[10px] w-[210px]" key={item.picUrl}>
                                <a href="/discover/djradio">
                                    <img src={item.picUrl} alt="" className='w-[40px] h-[40px]' />
                                </a>
                                <div className="w-[160px] ml-[8px]">
                                    <div className="text-[#000] font-bold mt-[3px]">{item.name}</div>
                                    <div className="text-[#666] whitespace-nowrap text-ellipsis overflow-hidden">{item.position}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
})

export default HotAnchor
