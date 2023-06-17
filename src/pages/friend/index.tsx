import { memo }  from "react";
import type { FC,ReactNode } from "react";

interface MyProps {
    children? : ReactNode
}
const Friend: FC<MyProps> = memo(() => {
    return(
        <div>Friend</div>
    )
})

export default Friend
