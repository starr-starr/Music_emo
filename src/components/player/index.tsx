import {memo, useEffect, useRef, useState} from "react";
import type { FC,ReactNode } from "react";
import {Link} from "react-router-dom";
import {getImageSize} from "@/utils/formatNumber.ts";
import {Slider} from "antd";
import defaultMusic from "@/assets/png/defaultMusic.png"
import {useGetSongDetailDataQuery, useGetSongLyricDataQuery} from "@/store/api/play/playApi.ts";
import {shallowEqualApp, useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {playerSlice} from "@/store/api/play/store.ts";
import {parseLyric} from "@/utils/parseLyric.ts";
import {formatTime} from "@/utils/formatNumber.ts";
import {getSongPlayerUrl} from "@/utils/getSongUrl.ts";

interface MyProps {
    children? : ReactNode
}

const Player: FC<MyProps> = memo(() => {
    const songId = 4877413
    const { data: songDetailData } = useGetSongDetailDataQuery(songId)
    const { data: songLyricData } = useGetSongLyricDataQuery(songId)

    const dispatch = useAppDispatch()

    const [ isPlaying,setIsPlaying ] = useState(false)
    const [ playModeState,setIsPlayModeState ] = useState(1)
    const [duration,setDuration] = useState(0)
    const [progress,setProgress] = useState(0)
    const [currentTime,setCurrentTime] = useState(0)
    const audioRef = useRef<HTMLAudioElement>(null)

    const playModeBtnPosition = ()  => {
        switch (playModeState){
            case 1: return '-66px -248px'
            case 2: return '-66px -344px'
            default: return '-3px -344px'
        }
    }

    const { currentSong , Lyric,LyricIndex,playMode,playSongList} = useAppSelector((state) => ({
        currentSong: state.player.currentSong,
        Lyric: state.player.Lyric,
        LyricIndex : state.player.LyricIndex,
        playMode : state.player.playMode,
        playSongList : state.player.playSongList
    }),shallowEqualApp)

    useEffect(() => {
            const playerAction = playerSlice.actions
            if (songDetailData && songLyricData) {
                const findIndex = playSongList.findIndex((item: { id: number }) => item.id === songId);
                if (findIndex === -1) {
                    const newList = [...playSongList];
                    newList.push(songDetailData);
                    dispatch(playerAction.changeCurrentSong(songDetailData[0]));
                    dispatch(playerAction.changePlaySongList(newList));
                    dispatch(playerAction.changePlaySongIndex(newList.length - 1));
                } else {
                    dispatch(playerAction.changeCurrentSong(playSongList[findIndex]));
                    dispatch(playerAction.changePlaySongIndex(findIndex));
                }
                dispatch(playerAction.changeLyric(parseLyric(songLyricData)));
            }
        }, [songDetailData,songLyricData]);
    useEffect(()=>{
        audioRef.current!.src = getSongPlayerUrl(currentSong?.id)
        audioRef.current
            ?.play()
            .then(()=>{
                setIsPlaying(true)
            })
            .catch((e)=>{
                setIsPlaying(false)
                console.log(e)})
        setDuration(currentSong?.dt)

    },[currentSong])
    return(
        <div
            style={{backgroundPosition:"0 0 ",backgroundRepeat:"repeat"}}
            className="playerBar fixed z-[99] h-[52px] bottom-0 inset-x-0">
            <div className="flex w-[980px] mx-auto my-0 items-center justify-between absolute -translate-x-2/4 h-[47px] left-2/4 bottom-0">
                <div className="flex items-center">
                    <button
                        style={{backgroundPosition:"0 -130px"}}
                        className="playerBar w-[28px] h-[28px] cursor-pointer"
                        // onClick={()=>handleChangeMusic(false)}
                    ></button>
                    <button
                        style={{backgroundPosition:`0 ${isPlaying ?'-165px' :'-204px'}`}}
                        className="playerBar w-9 h-9 mx-2 my-0 cursor-pointer"
                        // onClick={handlePlayClick}
                    ></button>
                    <button
                        style={{backgroundPosition:"-80px -130px"}}
                        className="playerBar w-[28px] h-[28px] cursor-pointer"
                        // onClick={()=>handleChangeMusic()}
                    ></button>
                </div>
                <div className="flex w-[642px] items-center">
                    <Link to="/artist">
                        <img
                            className="w-[34px] h-[34px] rounded-[5px]"
                            src={ currentSong?.al?.picUrl ? getImageSize(currentSong?.al?.picUrl,40) : defaultMusic}
                            alt=""
                        />
                    </Link>
                    <div className="flex-1 text-[#a1a1a1] ml-2.5">
                        <div className="text-[#e1e1e1] relative left-2 top-2">
                            <span>{currentSong?.name}</span>
                            <span className="text-[#a1a1a1] ml-2.5">{currentSong?.ar?.[0]?.name}</span>
                        </div>
                        <div className="flex items-center">
                            <Slider
                                step={0.5}
                                value={progress}
                                tooltip={{formatter : null}}
                                // onChange={handleSliding}
                                // onAfterChange={handleSlider}
                            />
                            <div className="text-[12px]">
                                <span className="text-[#a1a1a1]">{ currentTime ? formatTime(currentTime) : "00:00"}</span>
                                <span className="mx-[3px] my-0">/</span>
                                <span className="text-[#797979]">{ duration ? formatTime(duration) : "00:00"}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center relative top-[3px]">
                    <div className="flex items-center">
                        <button
                            className="w-[25px] h-[25px] pip"
                        ></button>
                        <button
                            style={{backgroundPosition:"-88px -163px"}}
                            className="w-[25px] h-[25px] playerBar"
                        ></button>
                        <button
                            style={{backgroundPosition:"-114px -163px"}}
                            className="w-[25px] h-[25px] playerBar"
                        ></button>
                    </div>
                    <div
                        style={{backgroundPosition:"-147px -248px"}}
                        className="flex items-center w-[126px] pl-[13px] playerBar"
                    >
                        <button
                            style={{backgroundPosition:"-2px -248px"}}
                            className="w-[25px] h-[25px] playerBar"
                        ></button>
                        <button
                            className={`w-[25px] h-[25px] playerBar ${playModeBtnPosition}`}
                            // onClick={handleChangePlayMode}
                        ></button>
                        <button
                            style={{backgroundPosition:"-42px -68px"}}
                            className="w-[59px] h-[25px] playerBar text-center text-[#ccc] pl-[18px]"
                        ></button>
                    </div>
                </div>
            </div>
            <audio
                ref={audioRef}
                // onTimeUpdate={handleSongPlay}
                // onEnded={handleEnd}
            />
        </div>
    )
})

export default Player
