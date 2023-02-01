import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Product } from "../../utils/types";

const fetchFromLocalStorage = () => {
  let cart = localStorage.getItem("favorites");
  if (cart) {
    return JSON.parse(localStorage.getItem("favorites")!);
  } else {
    return [];
  }
};

type FavState = {

  favorites: Product[] | []

}


const initialState: FavState = {
  favorites: fetchFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Product>) => {

      const exist = state.favorites.find(
        (item: Product) => item.product_id === action.payload.product_id
      );

      if (exist) {
        return state;
      }

      // проверить !
      if (!exist) {
        state.favorites = [ ...state.favorites, action.payload]
      }

      localStorage.setItem("favourites", JSON.stringify(state.favorites));
    },

    // проверить !
    removeFavorite: (state, action: PayloadAction<Product>) => {
      state.favorites = state.favorites.filter(
        (item: Product) => item.product_id !== action.payload.product_id
      );
      localStorage.setItem("favourites", JSON.stringify(state.favorites));
    },


    clearFavourites: (state) => {
      state.favorites = [];
      localStorage.setItem("favourites", JSON.stringify(state.favorites));
    },


  },
});

export const { addFavorite, removeFavorite } = cartSlice.actions;

export default cartSlice.reducer;
