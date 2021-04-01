import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

const initialState = {
    customerData: {}
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function addCustomer(customerData) {
        dispatch({
            type: 'ADD_CUSTOMER',
            payload: customerData
        });
    }

    function deleteCustomerData(customerData) {
        dispatch({
            type: 'DELETE_CUSTOMER',
            payload: customerData
        });
    }
    return (<GlobalContext.Provider value={{
        customerData: state.customerData,
        addCustomer,
        deleteCustomerData
    }}>
        {children}
    </GlobalContext.Provider>);
}