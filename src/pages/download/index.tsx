import { memo }  from "react";
import type { FC,ReactNode } from "react";

interface MyProps {
    children? : ReactNode
}
const Download: FC<MyProps> = memo(() => {
    return(
        <div>Download</div>
    )
})

export default Download
