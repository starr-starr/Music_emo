
export function getImageSize(
    imageUrl: string,
    width: number,
    height: number = width
) {
    return `${imageUrl}?param=${width}x${height}`
}

export function formatPlayCount(count:number){
    return count > 100000
        ? Math.floor(count / 10000) + '万'
        : count
}

export function formatTime(time:number){

    let seconds = time / 1000

    let minute = Math.floor(seconds/60)
    let second = Math.floor(seconds%60)

    let formatMinute = String(minute).padStart(2,'0')
    let formatSecond = String(second).padStart(2,'0')
    return `${formatMinute}:${formatSecond}`
}
