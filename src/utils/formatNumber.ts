
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
