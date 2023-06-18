import { memo }  from "react";
import type { FC,ReactNode } from "react";

import { footerLinks,footerImages } from "@/assets/data/footData.ts";

interface MyProps {
    children? : ReactNode
}
const Footer: FC<MyProps> = memo(() => {
    return(
        <div className='bg-[#f2f2f2] text-[#666] border-t-[#d3d3d3] border-t border-solid;'>
            <div className="flex justify-between items-center w-[980px] my-0 mx-auto flex-col">
                <div className="flex mt-[30px] footItem">
                    {
                        footerImages.map((item) => {
                            return (
                                <li className="items-center w-[45px] text-center ml-[80px]" key={item.link}>
                                    <a className="block w-[50px] h-[45px] footIcon" href={item.link} rel="noopener noreferrer" target="_blank"> </a>
                                    <span className="block w-[100px] h-[16px] mt-[8px] text-[12px] font-[400] whitespace-nowrap  ml-[-26px]">{item.title}</span>
                                </li>
                            )
                        })
                    }
                </div>
                <div className="leading-6 pt-[15px] text-[12px]">
                    <div className='flex mt-[20px]'>
                        {
                            footerLinks.map((item,index) => {
                                return (
                                    <div key={item.title} className='text-[#333]'>
                                        <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                                        { index < 6 && <span className="my-0 mx-[8px]">|</span>}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        <span className='mr-[15px]'>网易公司版权所有©1997-2023</span>
                        <span className='mr-[15px]'>杭州乐读科技有限公司运营：
                            <a href="https://p1.music.126.net/Mos9LTpl6kYt6YTutA6gjg==/109951164248627501.png" rel="noopener noreferrer" target="_blank">浙网文[2021] 1186-054号</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Footer
