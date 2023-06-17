import { memo }  from "react";
import type { FC,ReactNode } from "react";

interface MyProps {
    children? : ReactNode
}
const DjRadio: FC<MyProps> = memo(() => {
    return(
        <div>DjRadio</div>
    )
})

export default DjRadio
