import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

const initialState = {
    coupons: {},
    customerData: {},
    transactionsHistory: {}
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const addCustomer = customerData => {
        dispatch({
            type: 'ADD_CUSTOMER',
            payload: customerData
        });
    }

    const deleteCustomerData = customerData => {
        dispatch({
            type: 'DELETE_CUSTOMER',
            payload: customerData
        });
    }

    const addTransactions = transactionsHistory => {
        dispatch({
            type: 'ADD_TRANSACTIONS',
            payload: transactionsHistory
        });
    }

    const deleteTransactions = transactionsHistory =>  {
        dispatch({
            type: 'DELETE_TRANSACTIONS',
            payload: transactionsHistory
        });
    }

    const addCoupons = coupons => {
        dispatch({
            type: 'ADD_COUPONS',
            payload: coupons
        });
    }

    const deleteCoupons = coupons => {
        dispatch({
            type: 'DELETE_COUPONS',
            payload: coupons
        });
    }

    return (<GlobalContext.Provider value={{
        customerData: state.customerData,
        transactionsHistory:state.transactionsHistory,
        coupons: state.coupons,
        addCustomer,
        deleteCustomerData,
        addTransactions,
        deleteTransactions,
        addCoupons,
        deleteCoupons
    }}>
        {children}
    </GlobalContext.Provider>);
}