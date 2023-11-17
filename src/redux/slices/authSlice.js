import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    token: sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : null,
};


  const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
      
      setLoading(state, value) {
        state.loading = value.payload;
      },

      setToken(state, value) {
        state.token = value.payload;
      },
    },
  });

export const { setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;
  
