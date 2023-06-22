import { memo, useRef, useState} from "react";
import type { FC,ReactNode,ElementRef } from "react";
import {NavLink} from "react-router-dom";

import { useGetBannerDataQuery } from "@/store/api/discover.ts";

import { Carousel } from "antd";
import {useRenderSuccess} from "@/hooks/useRenderSuccessData.tsx";


interface MyProps {
    children? : ReactNode
}
const Swiper: FC<MyProps> = memo(() => {
    const { data,isSuccess } = useGetBannerDataQuery()
    const [ selectIndex, setSelectIndex ] = useState(0)
    const carouselRef = useRef<ElementRef<typeof Carousel>>(null)

    let bannerImg = data && `${data[selectIndex]?.imageUrl}?imageView&blur=40x20`

    function handleCarouselAfterChange(index:number){
        setSelectIndex(index)
    }

    function handleLiClick(index:number){
        carouselRef.current?.goTo(index);
        setSelectIndex(index)
    }

    const SwiperItem = memo(() => {
       return (
           <>
               <div
                   style={{background:`url('${bannerImg}') center center / 6000px`}}
               >
                   <div className='w-[982px] h-[270px] my-0 mx-auto flex relative'>
                       {/* 轮播图 */}
                       <div className='relative w-[730px]'>
                           <Carousel
                               autoplay
                               dots={false}
                               autoplaySpeed={10000}
                               effect="fade"
                               ref={carouselRef}
                               afterChange={handleCarouselAfterChange}
                           >
                               {
                                   data && data.map((item) => {
                                       return (
                                           <div className="h-[275px] truncate" key={item.imageUrl}>
                                               <img
                                                   className="w-full"
                                                   src={item.imageUrl}
                                                   alt={item.typeTitle}
                                               />
                                           </div>
                                       )
                                   })
                               }
                           </Carousel>
                           <ul className="absolute flex justify-center mx-auto my-0 bottom-0 inset-x-0">
                               {
                                   data && data.map((item,index) => {
                                       return (
                                           <li className='my-0 mx-[2px] bannerLi' key={item.imageUrl} onClick={()=>handleLiClick(index)}>
                                        <span
                                            className={`bannerItem inline-block w-[20px] h-[20px] cursor-pointer z-[9] ${ index === selectIndex ? 'active' : 'noactive'}`}>
                                        </span>
                                           </li>
                                       )
                                   })
                               }
                           </ul>
                       </div>
                       {/* 下载 */}
                       <div className='w-[254px]'>
                           <NavLink to='/download' className='discoverDownload block w-[250px] h-[270px] relative'>
                               <span className='absolute bottom-0 text-[#8d8d8d] left-[10px] truncate text-[12px] cursor-default'>PC 安卓 iPhone WP iPad Mac 六大客户端</span>
                           </NavLink>
                       </div>
                       {/* 两侧按钮 */}
                       <div className='absolute -translate-y-2/4 h-[63px] top-2/4 inset-x-0 '>
                           <button className="discoverBtn absolute w-[37px] h-[63px] bg-transparent cursor-pointer left-[-68px] bg-[0_-360px] hover:bg-gray-400" onClick={()=>carouselRef.current?.prev()}></button>
                           <button className="discoverBtn absolute w-[37px] h-[63px] bg-transparent cursor-pointer right-[-68px] bg-[0_-508px] hover:bg-gray-400" onClick={()=>carouselRef.current?.next()}></button>
                       </div>
                   </div>
               </div>
           </>
       )
    })

    return(
        <>
            {useRenderSuccess(isSuccess,<SwiperItem/>)}
        </>
    )
})

export default Swiper
