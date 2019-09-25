export const checkProduct = (product) => ({
        type: 'CHECK_PRODUCT',
        payload: {
            product,
            checkProduct: true,
        }
    });
    
    export const uncheckProduct = (product) => ({
        type: 'UNCHECK_PRODUCT',
        payload: {
                checkProduct: false,
        }
    });