import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

const initialState = {
    configData: {}
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function addConfig(configData) {
        dispatch({
            type: 'ADD_CONFIG',
            payload: configData
        });
    }

    return (<GlobalContext.Provider value={{
        configData: state.configData,
        addConfig
    }}>
        {children}
    </GlobalContext.Provider>);
}