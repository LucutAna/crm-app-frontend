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
        default:
            return state;
    }
}

export default AppReducer;