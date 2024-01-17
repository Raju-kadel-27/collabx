export const getActiveSidebarType = (pathname: string): string => {
    return pathname.split('/')[1]
}