import { memo }  from "react";
import type { FC,ReactNode } from "react";

import { footerLinks,footerImages } from "@/assets/data/footData.ts";

interface MyProps {
    children? : ReactNode
}
const Footer: FC<MyProps> = memo(() => {
    return(
        <div className='h-[172px] bg-[#f2f2f2] text-[#666] border-t-[#d3d3d3] border-t border-solid;'>
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
                {/*<div className="leading-6 pt-[15px]">*/}
                {/*        {*/}
                {/*            footerLinks.map(item => {*/}
                {/*                return (*/}
                {/*                    <div key={item.title} className='text-[#D9D9D9]'>*/}
                {/*                        <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>*/}
                {/*                        <span className="my-0 mx-[8px]">|</span>*/}
                {/*                    </div>*/}
                {/*                )*/}
                {/*            })*/}
                {/*        }*/}
                {/*    <div>*/}
                {/*        <span className='mr-[15px]'>网易公司版权所有©1997-2020</span>*/}
                {/*        <span className='mr-[15px]'>杭州乐读科技有限公司运营：*/}
                {/*            <a href="https://p1.music.126.net/Mos9LTpl6kYt6YTutA6gjg==/109951164248627501.png" rel="noopener noreferrer" target="_blank">浙网文[2018]3506-263号</a>*/}
                {/*        </span>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <span>违法和不良信息举报电话：0571-89853516</span>*/}
                {/*        <span>举报邮箱：*/}
                {/*            <a href="mailto:ncm5990@163.com" target="_blank" rel="noopener noreferrer">ncm5990@163.com</a>*/}
                {/*        </span>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <span>粤B2-20090191-18</span>*/}
                {/*        <a href="http://www.beian.miit.gov.cn/publish/query/indexFirst.action" rel="noopener noreferrer" target="_blank">*/}
                {/*            工业和信息化部备案管理系统网站*/}
                {/*        </a>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    )
})

export default Footer
