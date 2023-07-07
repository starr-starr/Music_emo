import { memo }  from "react";
import type { FC,ReactNode } from "react";
import MusicListHeader from "@/components/musicListHeader";
import {getImageSize} from "@/utils/formatNumber.ts";
import {useGetSignedSingerDataQuery} from "@/store/api/discover.ts";

interface MyProps {
    children? : ReactNode
}
const SignedSinger: FC<MyProps> = memo(() => {

    const { data } = useGetSignedSingerDataQuery(5)

    return(
        <div className='p-[20px]'>
            <MusicListHeader title="入驻歌手" more='查看全部' linkplace="/discover/artist" isDiscover={false}/>
            <div>
                {
                    data && data.map((item) => {
                        return (
                            <a href="/singer" key={item.id} className="flex h-[62px] bg-neutral-50 no-underline mt-3.5 hover:bg-[#f4f4f4]">
                                <img src={getImageSize(item.img1v1Url, 62)} alt="" className='w-[62px] h-[62px]' />
                                <div className="flex-1 flex flex-col justify-around border overflow-hidden px-3 py-[3px] border-l-[none] border-solid border-[#e9e9e9]">
                                    <div className="text-sm font-bold text-black">{item.name}</div>
                                    <div className="text-xs text-[#666] whitespace-nowrap text-ellipsis overflow-hidden">{item.alias.join('') || item.name}</div>
                                </div>
                            </a>
                        )
                    })
                }
            </div>
            <div className="mt-[12px]">
                <a
                    href=""
                    className="text-[#333] font-bold text-center block h-[31px] leading-[31px] rounded bg-neutral-50 border no-underline border-solid border-[#c3c3c3]"
                >
                    申请成为网易音乐人
                </a>
            </div>
        </div>
    )
})

export default SignedSinger
