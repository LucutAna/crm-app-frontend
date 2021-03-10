const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_CONFIG':
            return {
                ...state,
                configData: {...action.payload, ...state.configData}
            }
        default:
            return state;
    }
}

export default AppReducer;