import { ElementRef, memo, useRef } from "react";
import type { FC,ReactNode } from "react";
import { Carousel } from "antd";
import MusicListHeader from "@/components/musicListHeader";
import Album from "@/components/album";
import {useGetNewAlbumDataQuery} from "@/store/api/discover.ts";

interface MyProps {
    children? : ReactNode
}
const NewAlbum: FC<MyProps> = memo(() => {

    const { data } = useGetNewAlbumDataQuery()

    const bannerRef = useRef<ElementRef<typeof Carousel>>(null)
    function handlePrevClick() {
        bannerRef.current?.prev()
    }
    function handleNextClick() {
        bannerRef.current?.next()
    }


    return(
        <div className='mt-[20px]'>
            <MusicListHeader title="新碟上架" linkplace="/discover/album"/>
            <div className="h-[186px] bg-neutral-100 border flex justify-between items-center mt-5 mb-[37px] mx-0 px-[5px] py-0 border-solid border-[#d3d3d3]">
                <button
                    style={{backgroundPosition:"-260px -75px"}}
                    className="decorateBtn relative w-[17px] h-[17px] cursor-pointer -top-3 arrow-left hover:bg-[-280px_-75px]"
                    onClick={handlePrevClick}
                ></button>
                <div className="overflow-hidden flex-1">
                    <Carousel ref={bannerRef} dots={false} speed={1500}>
                        {
                            [0, 1].map((item) => {
                                return (
                                    <div key={item}>
                                        <div className="flex justify-between items-center">
                                            {
                                                  data && data.slice(item * 5, (item + 1) * 5).map((item) => {
                                                    return <Album key={item.id} itemData={item} />
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </div>
                <button
                    style={{backgroundPosition:"-300px -75px"}}
                    className="decorateBtn relative w-[17px] h-[17px] cursor-pointer -top-3 arrow-left hover:bg-[-320px_-75px]"
                    onClick={handleNextClick}
                ></button>
            </div>
        </div>
    )
})

export default NewAlbum
