import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import customerReducer from './slices/customerSlice';

import cartReducer from './slices/cartSlice';
import productsReducer from "./slices/productsSlice";
import favoritesReducer from "./slices/favoritesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    cart: cartReducer,
    products: productsReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// selections
export const selectProducts = (state: RootState) => state.products.products;
export const selectSingleProduct = (state: RootState) => state.products.product;
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectFavorites = (state: RootState) => state.favorites.favorites;