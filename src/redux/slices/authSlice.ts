import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { PayloadAction } from "@reduxjs/toolkit";

type SignInForm = {
  email: string;
  password: string;
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }: SignInForm) => {
    const URL = `http://localhost:8000/api/v1/auth/signin`;
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const results = await response.json();
    return results;
  }
);

type SignUpForm = {
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({
    lastName,
    firstName,
    middleName,
    phone,
    email,
    password,
  }: SignUpForm) => {
    const URL = `http://localhost:8000/api/v1/auth/signup`;
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lastName: lastName,
        firstName: firstName,
        middleName: middleName,
        phone: phone,
        email: email,
        password: password,
      }),
    });
    const results = await response.json();
    return results;
  }
);

// credentials: 'include',
export const signOut = createAsyncThunk("auth/signOut", async (token: string | null) => {

  if (token) {
    const URL = `http://localhost:8000/api/v1/auth/signout`;
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
    const results = await response.json();
    return results;
  }
});

type AuthState = {

  token: string | null;

  statusSignIn: "idle" | "pending" | "fulfilled" | "rejected";
  errorSignIn: string | null;
  apiMessageSignIn: string | null;

  statusSignUp: "idle" | "pending" | "fulfilled" | "rejected";
  errorSignUp: string | null;
  apiMessageSignUp: string | null;

  statusSignOut: "idle" | "pending" | "fulfilled" | "rejected";
  errorSignOut: string | null;
  apiMessageSignOut: string | null;
};

const initialState: AuthState = {

  token: null,

  statusSignIn: "idle",
  errorSignIn: null,
  apiMessageSignIn: null,

  statusSignUp: "idle",
  errorSignUp: null,
  apiMessageSignUp: null,

  statusSignOut: "idle",
  errorSignOut: null,
  apiMessageSignOut: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // signIn
      .addCase(signIn.pending, (state) => {
        state.statusSignIn = "pending";
        state.errorSignIn = null;
        state.apiMessageSignIn = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.statusSignIn = "fulfilled";
        state.errorSignIn = null;
        state.apiMessageSignIn = action.payload.message;
        //  !
        console.log(state.apiMessageSignIn);

        if (action.payload.token) {
          state.token = action.payload.token;

          //  !
        console.log(state.token);
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        state.statusSignIn = "rejected";
        state.errorSignIn = action.error.message!;
      })

      // signUp
      .addCase(signUp.pending, (state) => {
        state.statusSignUp = "pending";
        state.errorSignUp = null;
        state.apiMessageSignUp = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.statusSignUp = "fulfilled";
        state.errorSignUp = null;

        if (action.payload.token) {
          state.token = action.payload.token;

          //  !
        console.log(state.token);
        }
        
        state.apiMessageSignUp = action.payload.message;
        //  !
        console.log(state.apiMessageSignUp);
      })
      .addCase(signUp.rejected, (state, action) => {
        state.statusSignUp = "rejected";
        state.errorSignUp = action.error.message!;
      })
      // signOut
      .addCase(signOut.pending, (state) => {
        state.token = null;
        localStorage.removeItem("customerProfile");

        state.statusSignOut = "pending";
        state.errorSignOut = null;
        state.apiMessageSignOut = null     
      })
      .addCase(signOut.fulfilled, (state, action) => {
        state.statusSignOut = "fulfilled";
        state.errorSignOut = null;       
        state.apiMessageSignOut = action.payload.message;


        //  !
        console.log(state.apiMessageSignOut);
      })
      .addCase(signOut.rejected, (state, action) => {
        state.statusSignOut = "rejected";
        state.errorSignOut = action.error.message!;
        // what else ?
      });
  },
});

export default authSlice.reducer;
