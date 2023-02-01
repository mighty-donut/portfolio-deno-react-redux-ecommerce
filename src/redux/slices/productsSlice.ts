import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { Product } from '../../utils/types'

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const URL = `http://localhost:8000/api/v1/products`;
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
    
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingleProduct",
  async (id: string) => {
    const URL = `http://localhost:8000/api/v1/products/${id}`;
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json(); 
  }
);

type ProductsState = {
  products: Product[] | [];
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null;

  product: Product;
  singleProductStatus: "idle" | "pending" | "fulfilled" | "rejected";
  singleProductError: string | null;
};

const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: null,

  product: {} as Product,
  singleProductStatus: "idle",
  singleProductError: null,
};

// пилить сортировку
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortByPriceUp: (state) => {
      state.products = state.products.sort((a, b) => b.retail_price - a.retail_price);
    },
    sortByPriceDown: (state) => {
      state.products = state.products.sort((a, b) => a.retail_price - b.retail_price);
    },
    // filterByBrand: (state, action: PayloadAction<string>) => {
    //   state.products = state.products.filter((item) => item.brand === action.payload);
    // },
  },
  extraReducers(builder) {
    builder
      // GET ALL
      .addCase(fetchProducts.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.products = action.payload!;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message!;
      })

      // GET ONE
      .addCase(fetchSingleProduct.pending, (state, action) => {
        state.singleProductStatus = "pending";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProductStatus = "fulfilled";

        if (action.payload) {
          state.product = action.payload;
        }
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.singleProductStatus = "rejected";
        state.singleProductError = action.error.message!;
      });
  },
});

export const { sortByPriceUp, sortByPriceDown } = productsSlice.actions
export default productsSlice.reducer;