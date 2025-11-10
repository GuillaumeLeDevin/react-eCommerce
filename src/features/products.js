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
    return async function (dispatch) {
        try {
            const res = await fetch(`${import.meta.env.BASE_URL}data/inventory.json`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            dispatch(addProduct(data.products));
            } catch (err) {
            console.error("Erreur lors du chargement de l'inventaire :", err);
        }
    }
}

export const { addProduct, removeProduct } = products.actions;
export default products.reducer;