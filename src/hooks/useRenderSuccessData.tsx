import { useEffect, useState } from 'react';


export const useRenderSuccess = ( isSuccess: boolean,component:any ) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    if (isSuccess) {
        return component;
    } else {
        return <div>Error!</div>
    }
}

