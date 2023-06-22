import { memo }  from "react";
import type { FC,ReactNode } from "react";
import { formatPlayCount, getImageSize } from "@/utils/formatNumber.ts";

interface MyProps {
    children? : ReactNode
    itemData : any
}

const MusicListItem: FC<MyProps> = memo(( props ) => {
    const { itemData } = props
    return(
        <div className='w-[140px] my-[15px]'>
            <div className="relative">
                <img className='w-[140px] h-[140px]' src={getImageSize(itemData.picUrl, 140)} alt=""/>
                <div
                    style={{backgroundPosition:'0 0'}}
                    className="coverAll absolute top-0 left-0 w-full h-full">
                    <div
                        style={{backgroundPosition:'0 -537px'}}
                        className="coverAll flex justify-between items-center absolute text-[#ccc] h-[27px] px-2.5 py-0 bottom-0 inset-x-0">
            <span>
              <i className="iconAll inline-block w-3.5 h-[11px] bg-[0_-24px] mr-[5px]"></i>
              <span className="text-[12px]">{formatPlayCount(itemData.playCount)}</span>
            </span>
                        <i
                            style={{backgroundPosition:'0 0'}}
                            className="iconAll inline-block w-[16px] h-[17px]"></i>
                    </div>
                </div>
            </div>
            <div className="text-[14px] text-[#000] mt-[5px]">{itemData.name}</div>
        </div>
    )
})

export default MusicListItem
