import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Item = {
  id: number;
  quantity: number;
};

type CartState = {
  cartItems: Item[] | [];
};

const initialState: CartState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")!)
    : [],
};

const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<number>) => {
      const exist = state.cartItems.find(
        (item: Item) => item.id === action.payload
      );

      if (exist) {
        return state;
      }

      if (!exist) {
        state.cartItems = [
          ...state.cartItems,
          { id: action.payload, quantity: 1 },
        ];
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    delItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    incQty: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === action.payload && item.quantity < 9999) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decQty: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === action.payload && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // (лимит до 9999) убрать спецсимволы + и - !!!

    // запретить спецсимволы в input
    // по сути работа метода replace()
    // через Regex  -------   / ^\d+$ /  - numbers only regex

    // const handleNameChange = evt => {
    //   const newName = evt.target.value.replace(
    //     /[^a-zA-Z\s]/g,
    //     ""
    //   );
    //   setName(newName);
    // };

    setQtyManualy: (state, action: PayloadAction<Item>) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          if (action.payload.quantity >= 9999) {
            return { ...item, quantity: 9999 };
          }
          if (action.payload.quantity <= 1) {
            return { ...item, quantity: 1 };
          }
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addItem, delItem, incQty, decQty, setQtyManualy, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
