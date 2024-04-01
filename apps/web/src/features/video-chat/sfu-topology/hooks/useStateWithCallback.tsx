import {
    useState,
    useRef,
    useEffect,
    useCallback
} from 'react'

export const useStateWithCallback = (initialState:any) => {
    const [state, setState] = useState(initialState)
    const callbackRef = useRef(null);
    console.log({ state })

    const updateState = useCallback((newState:any, cbRef:any) => {
        callbackRef.current = cbRef;
        setState(
            (prev:boolean) => typeof newState === 'function' ? newState(prev) : newState
        )
    }, [])

    useEffect(() => {
        if (callbackRef.current) {
            callbackRef.current(state);
            callbackRef.current = null;
        }
    }, [state])

    return [state, updateState]
}
