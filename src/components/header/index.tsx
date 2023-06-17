import type { FC, ReactNode } from "react";
import { memo } from "react";
import { NavLink } from "react-router-dom";

import headTags from '@/assets/data/headTags.json'

import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface MyProps {
    children?: ReactNode
}

const Header: FC<MyProps> = memo(() => {
    const renderLink = (item:any) => {
        return (item.type === 'path'
            ? <NavLink to={item.path} className='text-center'>{item.title}<i className="icon topBar"></i></NavLink>
            : <a href={item.link} rel="noreferrer" target="_blank">{item.title}</a>)
    }
    return (
        <div className='h-[70px] bg-[#242424] text-[#fff] text-[12px]'>
            <div className='w-[1100px] mx-auto my-0'>
                <div className='flex justify-between'>
                    <div className='flex'>
                        {/* logo & tags */}
                        <a
                            style={{backgroundPosition: '0 0'}}
                            className="block w-44 h-[70px] indent-[-9999px] topBar"
                            href="/">网易云音乐
                        </a>
                        <div className='flex leading-[70px]'>
                            {
                                headTags.map( (item) => {
                                    return (
                                        <div className="relative text-[14px] w-[94px] text-center" key={item.title}>
                                            {renderLink(item)}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* search & login */}
                        <div className='flex items-center text-[#787878] text-xs'>
                            <Input className="w-[158px] h-[32px] rounded-[32px] text-[12px]" placeholder="音乐/视频/电台/用户" prefix={<SearchOutlined/>}/>
                            <span className="w-[90px] h-8 leading-8 text-center border text-[#ccc] cursor-pointer mx-4 my-0 rounded-2xl border-solid border-[#666] hover:text-[#fff] hover:border-[#fff]">创作者中心</span>
                            <span className="login">登录</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Header