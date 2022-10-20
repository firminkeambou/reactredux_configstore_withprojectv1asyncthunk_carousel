import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movies/movieSlice";
//this looks like combine reducer
export const store = configureStore({
  reducer: {
    movies: moviesReducer, //by the default the key is the name of the slice while creating slice
  },
});
