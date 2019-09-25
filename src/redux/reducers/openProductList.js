const initialState = {
    order: {},
    openProductList: false,
    text: 'hola',
    products: [],
    count: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_OPEN':
            return ({
                ...state,
                order: action.payload.order,
                openProductList: action.payload.openDialog,
            })
        
        case 'CLOSE_DIALOG':
            return ({
                ...state,
                openProductList: action.payload.openProductList,
                orders: action.payload.orders
            });
        
        case 'CHANGE_STATUS_PRODUCT':
            return ({
                ...state,
                order: action.payload.order,
            });
        case 'SET_CLOSE':
            return state

        case 'SET_ORDER':
            return ({
                ...state,
                order: action.payload.order
            });
        default:
            return state
    }
}

//export default reducer;