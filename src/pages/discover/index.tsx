import { memo }  from "react";
import type { FC,ReactNode } from "react";

interface MyProps {
    children? : ReactNode
}
const Discover: FC<MyProps> = memo(() => {
    return(
        <div>Discover</div>
    )
})

export default Discover
