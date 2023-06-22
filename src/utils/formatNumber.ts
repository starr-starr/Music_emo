
export function getImageSize(
    imageUrl: string,
    width: number,
    height: number = width
) {
    return `${imageUrl}?param=${width}x${height}`
}
