import { memo }  from "react";
import type { FC,ReactNode } from "react";
import {Link} from "react-router-dom";

interface MyProps {
    children?: ReactNode
    title: string
    keyword?: string []
    more?:string
    linkplace?:string
}

const MusicListHeader: FC<MyProps> = memo((props) => {

    const {title,keyword=[],more="更多",linkplace="/"} = props

    return(
        <div
            style={{backgroundPosition:'-225px -156px'}}
            className='decorateBtn z-[9] bg-[-225px_-156px] h-[33px] bg-[-225px_-156px] flex justify-between items-center pl-[34px] pr-2.5 pt-0 pb-1 border-b-2 border-b-[#c10d0c] border-solid'
        >
            <div className="flex items-center">
                <div className="font-[normal] text-xl leading-7 mr-5">{title}</div>
                <div className="flex items-center">
                    {
                        keyword?.map((item,index)=>{
                            return(
                                <div className="relative top-[2px] text-[#666] text-[12px]" key={item}>
                                    <span className="cursor-pointer hover:underline">{item}</span>
                                    { (index !== keyword.length - 1) && <span className='my-0 mx-[10px] '>|</span>}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="flex items-center">
                <Link to={linkplace} className="text-[#666] text-[12px] hover:underline">{more}</Link>
                <i
                    style={{backgroundPosition:'0 -240px'}}
                    className="decorateBtn inline-block w-3 h-3 ml-1" ></i>
            </div>
        </div>
    )
})

export default MusicListHeader
