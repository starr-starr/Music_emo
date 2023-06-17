import { memo }  from "react";
import type { FC,ReactNode } from "react";

interface MyProps {
    children? : ReactNode
}
const Recommend: FC<MyProps> = memo(() => {
    return(
        <div>Recommend</div>
    )
})

export default Recommend
