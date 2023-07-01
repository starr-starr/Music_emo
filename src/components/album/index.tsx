import { memo }  from "react";
import type { FC,ReactNode } from "react";
import { getImageSize } from "@/utils/formatNumber.ts";

interface MyProps {
    children? : ReactNode
    itemData : any
}
const Album: FC<MyProps> = memo(({itemData}) => {
    console.log(itemData);
    return(
        <div>
            <div className="relative w-[118px] h-[100px] overflow-hidden mt-[15px]">
                <img className="w-[100px] h-[100px]" src={getImageSize(itemData.picUrl, 100)} alt="" />
                <a
                    href=""
                    style={{backgroundPosition:"0 -570px"}}
                    className="coverAll absolute indent-[-9999px] inset-0"></a>
            </div>
            <div className="text-[12px] w-[100px]">
                <div className="text-black whitespace-nowrap overflow-hidden text-ellipsis">{itemData.name}</div>
                <div className="text-black whitespace-nowrap overflow-hidden text-ellipsis">{itemData.artist.name}</div>
            </div>
        </div>
    )
})

export default Album
