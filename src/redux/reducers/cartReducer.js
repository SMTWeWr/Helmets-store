const ADD_TO_CART = 'ADD_TO_CART'
const CLEAR_CART = 'CLEAR_CART'
const PLUS_CART_ITEM = 'PLUS_CART_ITEM'
const MINUS_CART_ITEM = 'MINUS_CART_ITEM'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'

const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0,
}

const getTotalPrice = arr => arr.reduce((sum, obj) => obj.price + sum, 0)

const getTotalCounter = (newItems, options) => {
    const keys = Object.keys(newItems)
    if (options === 'count') {
        return keys.reduce((sum, key) => newItems[key].items.length + sum, 0)
    } else if (options === 'price') {
        return  keys.reduce((sum, key) => newItems[key].totalPrice + sum, 0)
    } return 0
}

export const cart = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const currentItems = !state.items[action.payload.id]
                ? [action.payload]
                : [...state.items[action.payload.id].items, action.payload]

            const newItems = {
                ...state.items,
                [action.payload.id]: {
                    items: currentItems,
                    totalPrice: getTotalPrice(currentItems)
                }
            }

            const totalPrice = getTotalCounter(newItems, 'price')
            const totalCount = getTotalCounter(newItems, 'count')

            return {
                ...state, items: newItems,
                totalCount: totalCount, totalPrice: totalPrice
            }
        }
        case CLEAR_CART: {
            return {
                items: {},
                totalPrice: 0,
                totalCount: 0,
            }
        }
        case PLUS_CART_ITEM: {
            const newObjItems = [...state.items[action.payload].items,
                state.items[action.payload].items[0]]
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjItems,

                    totalPrice: getTotalPrice(newObjItems)
                },
            }

            const totalPrice = getTotalCounter(newItems, 'price')
            const totalCount = getTotalCounter(newItems, 'count')

            return {
                ...state,
                items: newItems,
                totalPrice,
                totalCount
            }
        }
        case MINUS_CART_ITEM: {
            const oldItems = state.items[action.payload].items
            const newObjItems = oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjItems,
                    totalPrice: getTotalPrice(newObjItems)
                }
            }
            const totalPrice = getTotalCounter(newItems, 'price')
            const totalCount = getTotalCounter(newItems, 'count')

            return {
                ...state,
                items: newItems,
                totalPrice,
                totalCount
            }
        }
        case REMOVE_CART_ITEM: {
            const newItems = {
                ...state.items
            }
            const currentTotalPrice = newItems[action.payload].totalPrice
            const currentTotalCount = newItems[action.payload].items.length

            delete newItems[action.payload]
            return {
                ...state,
                items: newItems,
                totalPrice: state.totalPrice - currentTotalPrice,
                totalCount: state.totalCount - currentTotalCount
            }
        }
        default:
            return state
    }
}

export const cartActions = {
    addToCart: (obj) => ({
        type: ADD_TO_CART,
        payload: obj
    }),
    clearCart: () => ({
        type: CLEAR_CART,
    }),
    removeCartItem: (id) => ({
        type: REMOVE_CART_ITEM,
        payload: id
    }),
    plusItem: (id) => ({
        type: PLUS_CART_ITEM,
        payload: id
    }),
    minusItem: (id) => ({
        type: MINUS_CART_ITEM,
        payload: id
    }),
}