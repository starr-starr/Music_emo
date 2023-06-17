import { memo }  from "react";
import type { FC,ReactNode } from "react";

interface MyProps {
    children? : ReactNode
}
const Album: FC<MyProps> = memo(() => {
    return(
        <div>Album</div>
    )
})

export default Album
