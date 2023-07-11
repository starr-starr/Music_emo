import {memo, useEffect, useRef, useState} from "react";
import type { FC,ReactNode } from "react";
import {Link} from "react-router-dom";

import defaultMusic from "@/assets/png/defaultMusic.png"
import {getImageSize} from "@/utils/formatNumber.ts";
import {formatTime} from "@/utils/formatNumber.ts";

import {shallowEqualApp, useAppSelector, useThunkDispatch} from "@/store/hooks.ts";
import {changeMusicNext, playerSlice} from "@/store/api/play/store.ts";

import {message,Slider} from "antd";
import {useGetSongUrlDataQuery} from "@/store/api/play/playApi.ts";
import {getSongPlayerUrl} from "@/utils/getSongUrl.ts";


interface MyProps {
    children? : ReactNode
}

const Player: FC<MyProps> = memo(() => {

    const dispatch = useThunkDispatch()

    const [ isPlaying,setIsPlaying ] = useState(false)
    const [isSliding,setIsSliding] = useState(false)
    const [ playModeState,setIsPlayModeState ] = useState(1)
    const [duration,setDuration] = useState(0)
    const [progress,setProgress] = useState(0)
    const [currentTime,setCurrentTime] = useState(0)
    const audioRef = useRef<HTMLAudioElement>(null)

    const { currentSong , Lyric,LyricIndex,playMode,playSongList} = useAppSelector((state) => ({
        currentSong: state.player.currentSong,
        Lyric: state.player.Lyric,
        LyricIndex : state.player.LyricIndex,
        playMode : state.player.playMode,
        playSongList : state.player.playSongList
    }),shallowEqualApp)

    const playModeBtnPosition = ()  => {
        switch (playModeState){
            case 1: return '-66px -248px'
            case 2: return '-66px -344px'
            default: return '-3px -344px'
        }
    }
    function handlePlayClick(){
        isPlaying
            ?   audioRef.current?.pause()
            :   audioRef.current?.play().catch(()=>setIsPlaying(false))
        setIsPlaying(!isPlaying)
    }
    function handleSongPlay(){
        const currentTime = audioRef.current!.currentTime*1000
        if(!isSliding){
            const progress = ((currentTime) / duration) * 100
            setProgress(progress)
            setCurrentTime(currentTime)
        }
        let index = Lyric.length - 1
        for (let i = 0;i<Lyric.length;i++){
            if (Lyric[i].time > currentTime){
                index = i -1
                break
            }
        }
        if (LyricIndex === index || index === -1) {
            return
        }
        dispatch(playerSlice.actions.changeLyricIndex(index))
        message.open({
            content: Lyric[index].text,
            duration: 0,
            key: "Lyric"
        })
    }
    function handleEnd(){
        if (playMode === 2){
            audioRef.current!.currentTime = 0
            audioRef.current?.play()
        }else {
            handleChangeMusic()
        }
    }
    function handleChangeMusic(next=true){
        dispatch(changeMusicNext(next))
        // handlePlayClick()
    }
    //  拖拽中
    function handleSliding(value:number){
        setIsSliding(true)
        setProgress(value)
        const currentTime = (value/100)* duration
        setCurrentTime(currentTime)
    }
    //  拖拽完
    function handleSlider(value:number){
        const currentTime = (value/100) * duration
        audioRef.current!.currentTime = currentTime / 1000
        setCurrentTime(currentTime)
        setProgress(value)
        setIsSliding(false)
    }
    //  播放模式
    function handleChangePlayMode(){
        let newMode = playMode + 1
        if (playMode>2) newMode = 0
        dispatch(playerSlice.actions.changePlayMode(newMode))
    }


    useEffect(()=>{
        // data === undefined ? null : audioRef.current!.src = data
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
                        onClick={()=>handleChangeMusic(false)}
                    ></button>
                    <button
                        style={{backgroundPosition:`0 ${isPlaying ?'-165px' :'-204px'}`}}
                        className="playerBar w-9 h-9 mx-2 my-0 cursor-pointer"
                        onClick={handlePlayClick}
                    ></button>
                    <button
                        style={{backgroundPosition:"-80px -130px"}}
                        className="playerBar w-[28px] h-[28px] cursor-pointer"
                        onClick={()=>handleChangeMusic()}
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
                        <div className="text-[#e1e1e1] relative left-2 top-2 text-[12px]">
                            <span>{currentSong?.name}</span>
                            <span className="text-[#a1a1a1] ml-2.5">{currentSong?.ar?.[0]?.name}</span>
                        </div>
                        <div className="flex items-center">
                            <Slider
                                step={0.5}
                                value={progress}
                                tooltip={{formatter : null}}
                                onChange={handleSliding}
                                onAfterChange={handleSlider}
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
                            onClick={handleChangePlayMode}
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
                onTimeUpdate={handleSongPlay}
                onEnded={handleEnd}
            />
        </div>
    )
})

export default Player
