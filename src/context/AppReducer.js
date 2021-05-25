const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_CUSTOMER':
            return {
                ...state,
                customerData: {...action.payload, ...state.customerData}
            }
        case 'DELETE_CUSTOMER':
            return {
                ...state,
                customerData: {}
            }
        case 'ADD_TRANSACTIONS':
            return {
                ...state,
                transactionsHistory: {...action.payload, ...state.transactionsHistory}
            }
        case 'DELETE_TRANSACTIONS':
            return {
                ...state,
                transactionsHistory: {}
            }
        default:
            return state;
    }
}

export default AppReducer;