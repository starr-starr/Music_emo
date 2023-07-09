import {memo, useState} from "react";
import type { FC,ReactNode } from "react";
import {Link} from "react-router-dom";
import {Slider} from "antd";

interface MyProps {
    children? : ReactNode
}


const Player: FC<MyProps> = memo(() => {
    const [ isPlaying,setIsPlaying ] = useState(false)
    const [ playMode,setIsPlayMode ] = useState(1)
    const playModeBtnPosition = () => {
        switch (playMode){
            case 1: return '-66px -248px'
            case 2: return '-66px -344px'
            default: return '-3px -344px'
        }
    }
    const currentSong = ''
    const currentTime = ''
    const duration = ''
    const progress = 1
    return(
        <div
            style={{backgroundPosition:"0 0 ",backgroundRepeat:"repeat"}}
            className="playerBar fixed z-[99] h-[52px] bottom-0 inset-x-0">
            <div className="flex w-[980px] mx-auto my-0 items-center justify-between absolute -translate-x-2/4 h-[47px] left-2/4 bottom-0">
                <div className="flex items-center">
                    <button
                        style={{backgroundPosition:"0 -130px"}}
                        className="playerBar w-[28px] h-[28px] cursor-pointer"
                    ></button>
                    <button
                        style={{backgroundPosition:`0 ${isPlaying ?'-165px' :'-204px'}`}}
                        className="playerBar w-9 h-9 mx-2 my-0 cursor-pointer"
                    ></button>
                    <button
                        style={{backgroundPosition:"-80px -130px"}}
                        className="playerBar w-[28px] h-[28px] cursor-pointer"
                    ></button>
                </div>
                <div className="flex w-[642px] items-center">
                    <Link to="/artist">
                        <img
                            className="w-[34px] h-[34px] rounded-[5px]"
                            alt=""
                        />
                    </Link>
                    <div className="flex-1 text-[#a1a1a1] ml-2.5">
                        <div className="text-[#e1e1e1] relative left-2 top-2">
                            <span>11</span>
                            <span className="text-[#a1a1a1] ml-2.5">11</span>
                        </div>
                        <div className="flex items-center">
                            <Slider
                                step={0.5}
                                value={progress}
                                tooltip={{formatter : null}}
                            />
                            <div>
                                <span className="text-[#e1e1e1]">{currentTime}</span>
                                <span className="mx-[3px] my-0">/</span>
                                <span>{duration}</span>
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
                        ></button>
                        <button
                            style={{backgroundPosition:"-42px -68px"}}
                            className="w-[59px] h-[25px] playerBar text-center text-[#ccc] pl-[18px]"
                        ></button>
                    </div>
                </div>
            </div>
            <audio/>
        </div>
    )
})

export default Player
