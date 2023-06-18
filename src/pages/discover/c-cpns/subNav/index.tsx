import { memo }  from "react";
import type { FC,ReactNode } from "react";

interface MyProps {
    children? : ReactNode
}
const SubNav: FC<MyProps> = memo(() => {
    return(
        <>
        </>
    )
})

export default SubNav
