import { memo }  from "react";
import type { FC,ReactNode } from "react";

interface MyProps {
    children? : ReactNode
}
const My: FC<MyProps> = memo(() => {
    return(
        <div>My</div>
    )
})

export default My
