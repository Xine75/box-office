import { useReducer, useEffect, useState, useRef, useCallback } from "react";
import {apiGet} from "./config"

function showsReducer(prevState, action) {
    switch(action.type){
        case "ADD":{
            return[...prevState, action.showId]
        }
        case "REMOVE": {
            return prevState.filter((showId) => showId !== action.showId);
        }
        default: return prevState;
    }
}

function usePersistedReducer(reducer, initialState, key) {
const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const persisted = localStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : initial;
});
    //sychronization with local storage
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))

    }, [state, key]);
    return [state, dispatch];
}

export function useShows(key="shows") {
    return usePersistedReducer(showsReducer, [], key);
}
//this custom hook allows us to populate the search text bar with the input from the last query
export function useLastQuery(key ="lastQuery") {
    const [input, setInput] = useState(() => {
        const persisted = sessionStorage.getItem(key);
        return persisted ? JSON.parse(persisted) : "";
    });

    const setPersistedInput = useCallback (newState => {
        setInput(newState);
        sessionStorage.setItem(key, JSON.stringify(newState));
    }, [key]);

    return [input, setPersistedInput]
}
const reducer = (prevState, action) => {
    switch(action.type) {

        case "FETCH_SUCCESS": {
            return {
                isLoading: false, 
                show: action.show, 
                error: null}
        }
        case "FETCH_FAILED": {
            return {
                ...prevState,
                isLoading: false,
                error: action.error
            }
        }
        default: return prevState
    }
}
export function useShow(showId){
    const [state, dispatch] = useReducer(
        reducer, 
        {
            show: null,
            isLoading: true,
            error: null
        });

//useReducer in place of these useStates
// const [show, setShow] = useState(null);
// const [isLoading, setIsLoading] = useState(true);
// const [error, setError] = useState(null);

useEffect(() => {

    let isMounted = true;

    apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
    .then(results => {
            if(isMounted){
            dispatch({type: "FETCH_SUCCESS", show: results});
            }
    }).catch(err => {
        if(isMounted){
            dispatch({type: "FETCH_FAILED", error: err.message}) ; 
        }
    });
    return () => {
        isMounted = false;
    }
}, [showId]);
    return state;
}

export function useWhyDidYouUpdate(name, props) {
    // Get a mutable ref object where we can store props ...
    // ... for comparison next time this hook runs.
    const previousProps = useRef();
    useEffect(() => {
      if (previousProps.current) {
        // Get all keys from previous and current props
        const allKeys = Object.keys({ ...previousProps.current, ...props });
        // Use this object to keep track of changed props
        const changesObj = {};
        // Iterate through keys
        allKeys.forEach((key) => {
          // If previous is different from current
          if (previousProps.current[key] !== props[key]) {
            // Add to changesObj
            changesObj[key] = {
              from: previousProps.current[key],
              to: props[key],
            };
          }
        });
        // If changesObj not empty then output to console
        if (Object.keys(changesObj).length) {
          console.log("[why-did-you-update]", name, changesObj);
        }
      }
      // Finally update previousProps with current props for next hook call
      previousProps.current = props;
    });
  }