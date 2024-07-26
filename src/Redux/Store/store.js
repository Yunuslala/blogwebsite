import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "../Slices/AuthSlice";
import { BlogSlice } from "../Slices/BlogSlice";


const store = configureStore({
  reducer: { AuthSlice:AuthSlice.reducer,BlogSlice:BlogSlice.reducer },
});

export default store;
