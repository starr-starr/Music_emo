import { memo } from "react";
import type { FC,ReactNode } from "react";
import {useGetBannerDataQuery} from "@/store/api/discover.ts";

// import { Carousel } from "antd";

interface MyProps {
    children? : ReactNode
}
const Swiper: FC<MyProps> = memo(() => {
    // const { data } = useGetBannerDataQuery()
    // console.log(data);
    return(
        <>
            Swiper
        </>
    )
})

export default Swiper
