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
            className='decorateBtn  h-[33px] flex justify-between items-center  pr-2.5 pt-0 pb-1 border-b-2 border-b-[#c10d0c] border-solid'
        >
            <div className="flex">
                <div
                    style={{backgroundPosition:'-225px -156px'}}
                    className="decorateBtn flex w-[25px] h-[25px]"
                ></div>
                <div className="flex items-center">
                    <Link to={linkplace} className="font-[normal] text-xl leading-7 mr-5">{title}</Link>
                    <div className="flex items-center">
                        {
                            keyword?.map((item)=>{
                                return(
                                    <div className="relative top-[2px] text-[#666] text-[12px]" key={item}>
                                        <span className="cursor-pointer hover:underline">{item}</span>
                                        { ( item !== keyword.at(-1) ) && <span className='my-0 mx-[10px] '>|</span>}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="flex items-center">
                <Link to={linkplace} className="text-[#666] text-[12px] hover:underline mt-[3px]">{more}</Link>
                <i
                    style={{backgroundPosition:'0 -240px'}}
                    className="decorateBtn inline-block w-3 h-3 ml-1 mt-[3px]"></i>
            </div>
        </div>
    )
})

export default MusicListHeader
