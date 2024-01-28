import { useEffect } from "react"

const useTitle = (title: string) => {

    useEffect(() => {
        const prevTitle = document.title;
        document.title = title;

        // title for recent history page
        return () => document.title = prevTitle

    }, [title])

}

export default useTitle;