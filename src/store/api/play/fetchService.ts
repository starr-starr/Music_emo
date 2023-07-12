import request from "@/utils/request.ts";
import {message} from "antd";
export const apiGetSongDetail = async (ids: number) => {
    const res: any = await request(`/song/detail?ids=${ids}`);
    if (res.code === 200) {
        return res.songs
    } else {
        message.error(`${res.msg}`);
        return '';
    }
};

export const apiGetSongLyric = async (id: number) => {
    const res: any = await request(`/lyric?id=${id}`);
    if (res.code === 200) {
        return res.lrc.lyric
    } else {
        message.error(`${res.msg}`);
        return '';
    }
};
