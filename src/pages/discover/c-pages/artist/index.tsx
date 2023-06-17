import { memo }  from "react";
import type { FC,ReactNode } from "react";

interface MyProps {
    children? : ReactNode
}
const Artist: FC<MyProps> = memo(() => {
    return(
        <div>Artist</div>
    )
})

export default Artist
