import { memo }  from "react";
import type { FC,ReactNode } from "react";

interface MyProps {
    children? : ReactNode
}
const PlayList: FC<MyProps> = memo(() => {
    return(
        <div>PlayList</div>
    )
})

export default PlayList
