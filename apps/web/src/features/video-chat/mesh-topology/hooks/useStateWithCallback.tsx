import {
    useState,
    useRef,
    useEffect,
    useCallback
} from 'react'

export const useStateWithCallback = (initialState:any) => {
    const [state, setState] = useState(initialState)
    const callbackRef = useRef(null);

    const updateState = useCallback((newState, cbRef) => {
        callbackRef.current = cbRef;
        setState(
            (prev) => typeof newState === 'function' ? newState(prev) : newState
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
