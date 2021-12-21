import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {filters} from "./reducers/filters";
import {products} from "./reducers/products";
import thunkMiddleware from "redux-thunk";
import {cart} from "./reducers/cartReducer";


const rootReducer = combineReducers({
    filters,
    products,
    cart
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store