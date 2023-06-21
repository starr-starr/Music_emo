import { memo }  from "react";
import type { FC,ReactNode } from "react";

interface MyProps {
    children? : ReactNode
    itemData : any
}
const MusicListItem: FC<MyProps> = memo(( props ) => {
    const { itemData } = props
    return(
        <div>MusicListItem</div>
    )
})

export default MusicListItem
