import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [

    ]
}

export const cart = createSlice({
    name: "cart",
    initialState,
    reducers: {
        createCartItem: (state, action) => {
            state.cartItems.push(action.payload);
        },
        updateItemFromSelect: (state, action) => {
            state.cartItems.find(item => item.id === action.payload.id).quantity = Number(action.payload.value);
        },
        deleteFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
            { /* state.items.find(item => item.id === action.payload.id).quantity = Number(action.payload.value); */}
        }
    }
})

export function addOneToCart(action) {
    return function (dispatch, getState) {
        const storeState = getState();

        const isAlreadyPresent = storeState.cart.cartItems.find(item => item.id === action)

        if(!isAlreadyPresent){
            const itemToAdd = storeState.products.items.find(item => item.id === action);

            const newCartItem = {
                ...itemToAdd,
                quantity: 1
            }
            dispatch(createCartItem(newCartItem));
        }
    }
}

export const { createCartItem, updateItemFromSelect, deleteFromCart } = cart.actions;
export default cart.reducer;