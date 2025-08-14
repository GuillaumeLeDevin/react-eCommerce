import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: undefined,
}

export const products = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.items = action.payload;
        }
    },
    extraReducers: {
        ["cart/createCartItem"]: (state, action) => {
            state.items.find(item => item.id === action.payload.id).picked = true;
        },
        ["cart/deleteFromCart"]: (state, action) => {
            state.items.find(item => item.id === action.payload.id).picked = false;
        }
    }
});

export function getProductsList(action) {
    return function (dispatch, getState) {
        fetch("/data/inventory.json")
        .then(response => response.json())
        .then(data => dispatch(addProduct(data.products)))
    }
}

export const { addProduct, removeProduct } = products.actions;
export default products.reducer;