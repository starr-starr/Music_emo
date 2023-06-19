import { memo, useRef, useState} from "react";
import type { FC,ReactNode,ElementRef } from "react";
import { useGetBannerDataQuery } from "@/store/api/discover.ts";

import { Carousel } from "antd";


interface MyProps {
    children? : ReactNode
}
const Swiper: FC<MyProps> = memo(() => {
    const { data } = useGetBannerDataQuery()
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

    return(
        <div
            style={{background:`url('${bannerImg}') center center / 6000px`}}
        >
            <div className='w-[982px] h-[270px] my-0 mx-auto flex relative'>
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
            </div>
        </div>
    )
})

export default Swiper
