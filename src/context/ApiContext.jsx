import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducer";


const API = 'http://hn.algolia.com/api/v1/search?'
const initialState = {
    isLoading: true,
    query: 'HTML',
    nbPages: 0,
    page: 0,
    hits: [],
}
const AppContext = React.createContext();

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    // const apiFetchData = async (url) => {
    //     dispatch({ type: 'SET_LOADING' })
    //     try {
    //         const res = await fetch(url, {
    //             method: 'GET',
    //             mode: 'no-cors'
    //         })
    //         const data = await res.json();
    //         console.log(data);

    //         dispatch({
    //             type: 'GET_STORIES',
    //             payload: {
    //                 hits: data.hits,
    //                 nbPages: data.nbPages,
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    const apiFetchData = async (url) => {
        dispatch({ type: 'SET_LOADING' });
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            console.log(data);

            dispatch({
                type: 'GET_STORIES',
                payload: {
                    hits: data.hits,
                    nbPages: data.nbPages,
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        apiFetchData(`${API}query=${state.query}&page=${state.page}`);
    }, [])

    return (
        <AppContext.Provider value={{ ...state }}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext);
}

export {
    AppContext, AppProvider, useGlobalContext
}

