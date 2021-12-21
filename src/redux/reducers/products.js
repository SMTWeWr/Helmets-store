import axios from "axios";

const SET_PRODUCT = 'SET_PRODUCT'
const SET_LOADED = 'SET_LOADED'

const initialState = {
    items: [],
    isLoaded: false
}

export const products = (state = initialState, action) => {
    switch (action.type){
        case SET_PRODUCT: {
            return {...state, items: action.payload, isLoaded: true}
        }
        case SET_LOADED: {
            return {...state, isLoaded: action.payload}
        }
        default:
            return state
    }
}

export const actions = {
    setProduct: (items) => ({
        type: SET_PRODUCT,
        payload: items
    }),
    setLoaded: boolean => ({
        type: SET_LOADED,
        payload: boolean
    })
}

export const productsThunk = (category, sortBy) => async (dispatch) => {
    await dispatch(actions.setLoaded(false))
    await axios.get(`/helmets?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`)
        .then(({data}) => dispatch(actions.setProduct(data)))
}