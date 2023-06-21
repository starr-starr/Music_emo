import { useEffect, useState } from 'react';
import type { ReactElement } from "react";

export const useRenderSuccess = ( isSuccess: boolean,component:ReactElement ) => {
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

