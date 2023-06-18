import { memo }  from "react";
import type { FC,ReactNode } from "react";
import { NavLink } from "react-router-dom";

import { SubNavData } from "@/assets/data/headData.ts";

interface MyProps {
    children? : ReactNode
}
const SubNav: FC<MyProps> = memo(() => {
    return(
        <div className='z-[90] h-[35px] box-border bg-[#C20C0C] border-b-[#a40011] border-b border-solid'>
            <div className='w-[1100px] h-[34px] mx-auto my-0 flex pl-[181px]'>
                {
                    SubNavData.map((item:any) => {
                        return (
                            <div className="SubNavItem"  key={item.title}>
                                <NavLink to={item.link} className='inline-block h-5 leading-5 text-white text-xs mt-[7px] mb-0 mx-[17px] px-[13px] py-0'>{item.title}</NavLink>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
})

export default SubNav
