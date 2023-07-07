import { memo }  from "react";
import type { FC,ReactNode } from "react";

interface MyProps {
    children? : ReactNode
}
const UserLogin: FC<MyProps> = memo(() => {
    return(
        <div
            style={{backgroundPosition:'0 0'}}
            className='decorateBtn flex flex-col items-center justify-center text-[12px]'>
            <p className='w-[205px] mx-auto my-0 leading-[25px] mt-3'>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
            <a
                href="/login"
                style={{backgroundPosition:'0 -195px',textShadow:'0 1px 0 #8a060b'}}
                className="decorateBtn inline-block w-[100px] h-[31px] leading-[31px] text-center text-white no-underline my-2.5">用户登录</a>
        </div>
    )
})

export default UserLogin
