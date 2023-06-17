import { memo }  from "react";
import type { FC,ReactNode } from "react";

interface MyProps {
    children? : ReactNode
}
const TopList: FC<MyProps> = memo(() => {
    return(
        <div>TopList</div>
    )
})

export default TopList
