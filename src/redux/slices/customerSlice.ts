import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { Customer } from "../../utils/types";

export const getProfile = createAsyncThunk(
  "customer/getProfile",
  async (token: string | null) => {
    const URL = `http://localhost:8000/api/v1/customers/get`;
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const results = await response.json();
    return results;
  }
);

export const updateProfile = createAsyncThunk(
  "customer/updateProfile",
  async ({ token, form }: { token: string | null; form: Customer }) => {
    const URL = `http://localhost:8000/api/v1/customers/update`;
    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        lastName: form.lastName,
        firstName: form.firstName,
        middleName: form.middleName,
        phone: form.phone,
        email: form.email,
        password: form.password,
      }),
    });
    const results = await response.json();
    return results;
  }
);

type CustomerState = {
  customer: Customer | null;

  statusGet: "idle" | "pending" | "fulfilled" | "rejected";
  errorGet: string | null;
  apiMessageGet: string | null;

  statusUpdate: "idle" | "pending" | "fulfilled" | "rejected";
  errorUpdate: string | null;
  apiMessageUpdate: string | null;
};

const initialState: CustomerState = {
  // !
  customer: null,
  
  statusGet: "idle",
  errorGet: null,
  apiMessageGet: null,

  statusUpdate: "idle",
  errorUpdate: null,
  apiMessageUpdate: null,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // get profile
      .addCase(getProfile.pending, (state) => {
        state.statusGet = "pending";
        state.errorGet = null;
        state.apiMessageGet = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.statusGet = "fulfilled";
        state.errorGet = null;
        state.apiMessageGet = action.payload.message;
        //  !
        console.log(state.apiMessageGet);

        if (action.payload.customer) {
          localStorage.setItem(
            "customerProfile",
            JSON.stringify(action.payload.customer)
          );
          state.customer = localStorage.getItem("customerProfile")
            ? JSON.parse(localStorage.getItem("customerProfile")!)
            : null;
        }

      // !
      console.log("get-resp-fulfilled", action.payload.customer);

      })
      .addCase(getProfile.rejected, (state, action) => {
        state.statusGet = "rejected";
        state.errorGet = action.error.message!;
      })

      // update profile
      .addCase(updateProfile.pending, (state) => {
        state.statusUpdate = "pending";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.statusUpdate = "fulfilled";
        state.errorUpdate = null;
        state.apiMessageUpdate = action.payload.message;
        //  !
        console.log(state.apiMessageUpdate);


        if(action.payload.customer) {
          localStorage.setItem(
            "customerProfile",
            JSON.stringify(action.payload.customer)
          );
          state.customer = localStorage.getItem("customerProfile")
            ? JSON.parse(localStorage.getItem("customerProfile")!)
            : null;

        // !
        console.log("UPDATE-resp-fulfilled", action.payload.customer);
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.statusUpdate = "rejected";
        state.errorUpdate = action.error.message!;

        //  !
        console.log('error UPDATE', state.errorUpdate);
      });
  },
});

export default customerSlice.reducer;
