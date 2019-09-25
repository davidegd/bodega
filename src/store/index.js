import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import logger from 'redux-logger';
import data from './orders.json';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';

function orderReducer(state = [], action) {
  switch (action.type) {
    case '@@ORDERS/ADD_ORDER': {
      return [
        ...state,
        action.payload.order,
      ]
    }
    default: return state;
  }
}

const initialState = {
  ordersCopy: [],
  order: {},
    openProductList: false,
    text: 'hola',
    products: [],
    count: 0,
};



function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_COPY_ORDERS':
      return ({
        ...state,
        ordersCopy: action.payload.orders
      });
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

function ordersCopyReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_COPY_ORDERS':
      return ({
        ...state,
        ordersCopy: action.payload.orders
      });

    default: 
      return state;
  }
}

//let mainEnhancer = compose(persistState('reducer', 'ordersCopy'));


/* mock of realtime action */
let timerId = null;
let index = 0;

function getRandom(min = 1, max = 10) {
  let result = Math.random();
  result = result * (max - min + 1) + min;
  result = Math.floor(result);
  return result * 1000;
}

function startEvent(delay) {
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(() => {
    store.dispatch({
      type: '@@ORDERS/ADD_ORDER',
      payload: {
        order: data[index]
      }
    });
    if (index < (data.length - 1)) {
      index += 1;
      return startEvent(getRandom());
    }
    return
  }, delay)
}

startEvent(getRandom());
 
const rootReducer = combineReducers({
  reducer: reducer,
  orders: orderReducer,
  ordersCopy: ordersCopyReducer
})

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist:['ordersCopy']
};
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer,composeWithDevTools(applyMiddleware(logger)))
export const persistor = persistStore(store)
export default store;