import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

const initialState = {
    customerData: {},
    transactionsHistory: {}
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

    function addTransactions(transactionsHistory) {
        dispatch({
            type: 'ADD_TRANSACTIONS',
            payload: transactionsHistory
        });
    }

    function deleteTransactions(transactionsHistory) {
        dispatch({
            type: 'DELETE_TRANSACTIONS',
            payload: transactionsHistory
        });
    }
    return (<GlobalContext.Provider value={{
        customerData: state.customerData,
        transactionsHistory:state.transactionsHistory,
        addCustomer,
        deleteCustomerData,
        addTransactions,
        deleteTransactions
    }}>
        {children}
    </GlobalContext.Provider>);
}