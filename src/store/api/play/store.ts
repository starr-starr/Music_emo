import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {parseLyric} from "@/utils/parseLyric.ts";
import {RootState} from "@/store";

interface ILyric {
    time: number
    text: string
}
interface IPlayState {
    currentSong: any
    Lyric: ILyric[]
    LyricIndex : number
    playSongList :any[]
    playSongIndex:number
    playMode : number
}
const initialState: IPlayState = {
    currentSong: {},
    Lyric : [],
    LyricIndex: -1,
    playSongList:[
        {
            "name": "第一次愛的人",
            "id": 1953017440,
            "pst": 0,
            "t": 0,
            "ar": [
                {
                    "id": 9606,
                    "name": "王心凌",
                    "tns": [],
                    "alias": []
                }
            ],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": "",
            "fee": 8,
            "v": 5,
            "crbt": null,
            "cf": "",
            "al": {
                "id": 145960529,
                "name": "青春回忆杀",
                "picUrl": "https://p2.music.126.net/c8ABEQvA5obbNaUP1ffuzg==/109951167506299200.jpg",
                "tns": [],
                "pic_str": "109951167506299200",
                "pic": 109951167506299200
            },
            "dt": 229250,
            "h": {
                "br": 320000,
                "fid": 0,
                "size": 9172158,
                "vd": -64024,
                "sr": 44100
            },
            "m": {
                "br": 192000,
                "fid": 0,
                "size": 5503312,
                "vd": -61482,
                "sr": 44100
            },
            "l": {
                "br": 128000,
                "fid": 0,
                "size": 3668889,
                "vd": -59817,
                "sr": 44100
            },
            "sq": {
                "br": 1070268,
                "fid": 0,
                "size": 30669889,
                "vd": -64146,
                "sr": 44100
            },
            "hr": null,
            "a": null,
            "cd": "01",
            "no": 17,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 1,
            "s_id": 0,
            "mark": 8192,
            "originCoverType": 1,
            "originSongSimpleData": null,
            "tagPicList": null,
            "resourceState": true,
            "version": 5,
            "songJumpInfo": null,
            "entertainmentTags": null,
            "awardTags": null,
            "single": 0,
            "noCopyrightRcmd": null,
            "rtype": 0,
            "rurl": null,
            "mst": 9,
            "cp": 7003,
            "mv": 0,
            "publishTime": 1654185600000
        },
        {
            "name": "把回忆拼好给你",
            "id": 1403318151,
            "pst": 0,
            "t": 0,
            "ar": [
                {
                    "id": 14312549,
                    "name": "王贰浪",
                    "tns": [],
                    "alias": []
                }
            ],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": "",
            "fee": 8,
            "v": 19,
            "crbt": null,
            "cf": "",
            "al": {
                "id": 83305009,
                "name": "把回忆拼好给你",
                "picUrl": "https://p1.music.126.net/CBx2K_jEN3SNWwYztagPPw==/109951164485969446.jpg",
                "tns": [],
                "pic_str": "109951164485969446",
                "pic": 109951164485969440
            },
            "dt": 381000,
            "h": {
                "br": 320001,
                "fid": 0,
                "size": 15243015,
                "vd": -41846,
                "sr": 44100
            },
            "m": {
                "br": 192001,
                "fid": 0,
                "size": 9145826,
                "vd": -39239,
                "sr": 44100
            },
            "l": {
                "br": 128001,
                "fid": 0,
                "size": 6097232,
                "vd": -37537,
                "sr": 44100
            },
            "sq": {
                "br": 885198,
                "fid": 0,
                "size": 42157601,
                "vd": -41840,
                "sr": 44100
            },
            "hr": null,
            "a": null,
            "cd": "01",
            "no": 1,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 0,
            "s_id": 0,
            "mark": 8192,
            "originCoverType": 1,
            "originSongSimpleData": null,
            "tagPicList": null,
            "resourceState": true,
            "version": 19,
            "songJumpInfo": null,
            "entertainmentTags": null,
            "awardTags": null,
            "single": 0,
            "noCopyrightRcmd": null,
            "rtype": 0,
            "rurl": null,
            "mst": 9,
            "cp": 0,
            "mv": 0,
            "publishTime": 1573660800000
        }
    ],
    playSongIndex:-1,
    playMode:0  // 0 1 2 顺序 随机 单曲
}
type FetchCurrentSongParams = {
    songId: number;
    songDetailData: any;
    songLyricData: any;
}
export const FetchCurrentSong = createAsyncThunk<void,FetchCurrentSongParams,{state:RootState}>(
    "currentSongs",
    ({songId,songDetailData,songLyricData},{dispatch,getState})=>{
    // const songId = 4877413
    // const { data: songDetailData } = useGetSongDetailDataQuery(songId)
    // const { data: songLyricData } = useGetSongLyricDataQuery(songId)
    //     console.log(songLyricData);
        const playSongList = getState().player.playSongList
    const findIndex = playSongList.findIndex((item: { id: number; }) => item.id === songId)
    if (findIndex === -1) {
        const newList = [...playSongList];
        newList.push(songDetailData);
        songDetailData && dispatch(changeCurrentSong(songDetailData));
        dispatch(changePlaySongList(newList));
        dispatch(changePlaySongIndex(newList.length - 1));
    } else {
        dispatch(changeCurrentSong(playSongList[findIndex]));
        dispatch(changePlaySongIndex(findIndex));
    }
    dispatch(changeLyric(parseLyric(songLyricData)));
})
export const changeMusicNext = createAsyncThunk<void, boolean, {state:RootState}>(
    'changemuisc',
    (isNext:boolean, { dispatch, getState }) => {
        // 1.获取state中的数据
        const player = getState().player
        const playMode = player.playMode
        const songIndex = player.playSongIndex
        const songList = player.playSongList

        // 2.根据不同的模式计算不同的下一首歌曲的索引
        let newIndex = songIndex
        if (playMode === 1) {
            // 随机播放
            newIndex = Math.floor(Math.random() * songList.length)
        } else {
            // 单曲顺序和顺序播放
            newIndex = isNext ? songIndex + 1 : songIndex - 1
            if (newIndex > songList.length - 1) newIndex = 0
            if (newIndex < 0) newIndex = songList.length - 1
        }

        // 3.获取当前的歌曲
        const song = songList[newIndex]
        dispatch(changeCurrentSong(song))
        dispatch(changePlaySongIndex(newIndex))

        // 4.请求新的歌词
        fetch(`/api/lyric?id=${song.id}`)
            .then(response => response.json())
            .then((res:any) => {
            // 1.获取歌词的字符串
            const lyricString = res.lrc.lyric
            // 2.对歌词进行解析(一个个对象)
            const lyrics = parseLyric(lyricString)
            // 3.将歌词放到state中
            dispatch(changeLyric(lyrics))
        })
    }
)
export const playerSlice = createSlice({
    name: 'player',
    initialState: initialState,
    reducers: {
        changeCurrentSong(state,{payload}){
            state.currentSong = payload
        },
        changeLyric(state,{payload}){
            state.Lyric = payload
        },
        changeLyricIndex(state,{payload}){
            state.LyricIndex = payload
        },
        changePlaySongList(state,{payload}){
            state.playSongList = payload
        },
        changePlaySongIndex(state,{payload}){
            state.playSongIndex = payload
        },
        changePlayMode(state,{payload}){
            state.playMode = payload
        },
    }
})

export const {
    changeCurrentSong,
    changeLyric,
    changeLyricIndex,
    changePlaySongIndex,
    changePlaySongList,
    changePlayMode
} = playerSlice.actions

export default playerSlice.reducer
