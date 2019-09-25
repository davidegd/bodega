export const openProductList = (order) => ({
    type: 'SET_OPEN',
    payload: {
        order,
        openProductList: true,
    }
    i++;
  }

if (!band) {
    let orderProduct = {
        "_id": "",
        "orderStatus": false,
        "products": [
        ]
    };

    orderProduct._id = order._id;
    orderProduct.orderStatus = false;
    order.products.map((product) => {
        product.status = false;
        orderProduct.products.push(false);
    });

    orders.push(orderProduct);
    localStorage.setItem('orders', JSON.stringify(orders));

} else {
    let j = 0;
    order.products.map((product) => {
        product.status = orders[i - 1].products[j];
        j++;

        if (product.status) {
            count++;
        }

    });

    console.log("Couuuuunt: ", count);
}

return ({
    type: 'SET_OPEN',
    payload: {
        order,
        openProductList: true,
        text: 'HolaMundo',
        products: order.products,
        count
    }
});* /
console.log("order: ", order);
return ({
    type: 'SET_OPEN',
    payload: {
        openDialog: true,
        order
    }
});

}

export const closeDialog = () => ({
    type: 'CLOSE_DIALOG',
    payload: {
        openProductList: false,
    }
});

export const saveDialog = (order, orders) => {
    //let orders = JSON.parse(localStorage.getItem('orders'));
    let i = 0;
    let band = true;

    while (i < orders.length && (band)) {
        if (order._id == orders[i]._id) {
            orders[i] = order;
            band = false;
        }
        i++;
    }

    if (orders[i - 1].count === orders[i - 1].products.length) {
        orders[i - 1].statusOrder = true;
    }

    return ({
        type: 'CLOSE_DIALOG',
        payload: {
            openProductList: false,
            orders
        }
    });
}

export const selectedProduct = (order, index) => {
    order.products[index].status = order.products[index].status ? false : true;

    if (order.products[index].status) {
        order.count++;
    } else {
        order.count--;
    }

    return ({
        type: 'CHANGE_STATUS_PRODUCT',
        payload: {
            order
        }
    });
}

export const copyOrders = (order1, orders) => {
    let order = {};

    if (order1.length > 0) {
        order = order1[order1.length - 1];
    }

    if (order !== undefined) {
        let orderCopy = {
            _id: order._id,
            user: {
                name: order.user.name
            },
            region_code: order.region_code,
            routeId: order.routeId,
            slot: order.slot,
            statusOrder: false,
            count: 0,
            products: []
        };

        order.products.map((product) => {
            let productAux = {
                _id: product._id,
                name: product.name,
                price: product.price,
                quantity: product.quantity,
                total: product.total,
                status: false
            }

            orderCopy.products.push(productAux);
        });
        orders.push(orderCopy);
    }

    return ({
        type: 'ADD_COPY_ORDERS',
        payload: {
            orders
        }
    });
}