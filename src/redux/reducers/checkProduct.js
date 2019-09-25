const initialState = {
    product: [],
    checkProduct: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'CHECK_PRODUCT':
            return ({
                ...state,
                product: action.payload.products,
                checkProduct: action.payload.checkProduct,
            })
        
        case 'UNCHECK_PRODUCT':
            return ({
                ...state,
                checkProduct: action.payload.checkProduct,
            });
            
        default:
            return state
    }
}

export default reducer;