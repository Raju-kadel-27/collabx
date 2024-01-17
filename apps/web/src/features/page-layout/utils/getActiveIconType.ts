export const getActiveIconType = (pathname: string): string => {
    return pathname.split('/')[1]
}