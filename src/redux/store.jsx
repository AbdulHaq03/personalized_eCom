import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // Importing the reducer

export const store = configureStore({
    reducer: {
        cart: cartReducer, // Using the reducer here
    },
});
