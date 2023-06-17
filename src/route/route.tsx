import  { lazy } from "react";
import  type { RouteObject } from 'react-router-dom'
import { Navigate } from "react-router-dom";

const Discover = lazy(() => import('@/pages/discover'))
    const Recommend = lazy(() => import('@/pages/discover/c-pages/recommend'))
    const TopList = lazy(() => import('@/pages/discover/c-pages/toplist'))
    const PlayList = lazy(() => import('@/pages/discover/c-pages/playlist'))
    const DjRadio = lazy(() => import('@/pages/discover/c-pages/djradio'))
    const Artist = lazy(() => import('@/pages/discover/c-pages/artist'))
    const Album = lazy(() => import('@/pages/discover/c-pages/album'))
const My = lazy(() => import('@/pages/my'))
const Friends = lazy(() => import('@/pages/friend'))
const Download = lazy(() => import('@/pages/download'))

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to='/discover'/>
    },
    {
        path : '/discover',
        element:<Discover/>,
        children : [
            {
                path : '/discover',
                element: <Navigate to='/discover/recommend'/>
            },
            {
                path : '/discover/recommend',
                element: <Recommend/>
            },
            {
                path : '/discover/toplist',
                element: <TopList/>
            },
            {
                path : '/discover/playlist',
                element: <PlayList/>
            },
            {
                path : '/discover/djradio',
                element: <DjRadio/>
            },
            {
                path : '/discover/artist',
                element: <Artist/>
            },
            {
                path : 'album',
                element: <Album/>
            }
        ]
    },
    {
        path : '/my',
        element: <My/>
    },
    {
        path : '/friends',
        element: <Friends/>
    },
    {
        path : '/download',
        element: <Download/>
    }
]
