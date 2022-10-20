import { createSlice } from "@reduxjs/toolkit";
//when using redux, createAsyncThunk must be used to fetch informations
// it is advisable to make all Api Calls in the slice with asyncThunk instead of useEffect
//createAsyncThunk takes two arguments 1: string identifying action 2: payload creator  callback function, there is a third parameter which is an object
//with createAsyncThunk, we usually use extrareducer

import { createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    // this term must come from the search bar
    //const movieText = "Harry";
    //movieApi here match the baseUrl
    //all the parameters come from "https://www.omdbapi.com/" where they explain to us how to use the API
    const response = await movieApi.get(
      `?apikey=${APIKey}&s=${term}&type=movie`
    );

    return response.data; //response.data correspond au payload
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    //  const seriesText = "Friends";
    //movieApi here match the baseUrl
    //all the parameters come from "https://www.omdbapi.com/" where they explain to us how to use the API
    const response = await movieApi.get(
      `?apikey=${APIKey}&s=${term}&type=series`
    );

    return response.data; //response.data correspond au payload
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await movieApi.get(`?apikey=${APIKey}&i=${id}&Plot=full`);

    return response.data; //response.data correspond au payload
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
  moviePending: false,
  showPending: false,
};

// a slice is just a kind o a reducer
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    //first action
    //we comment addMovies out because, it is now part of the fetchAsyncShows
    /* addMovies: (state, action) => {
    call can be addMovies(response.data)
    or instead of action, I can just just destructure like {payload}
       state.movies = action.payload; // here, we can modify directly states properties because of the use of immer library who handle immutability automatically , whithout immer , we would have used spread operator({...state,payload}) to copy before making any change
     },*/
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: (state) => {
      console.log("pending");
      return { ...state, moviePending: true }; // state of execution
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, movies: payload, moviePending: false };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected");
    },
    [fetchAsyncShows.pending]: (state) => {
      console.log("pending");
      return { ...state, showPending: true }; // state of execution
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, shows: payload, showPending: false };
    },
    [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, selectedMovieOrShow: payload };
    },
  },
});

// the following creates the action called movies

export const { addMovies, removeSelectedMovieOrShow } = movieSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: getAllmovies=`useSelector((state: RootState) => state.movies.movies)`
export const getAllMovies = (state) => state.movies.movies; //first "movies" is the name of the slice and the second "movies" come from the store
export const getAllShows = (state) => state.movies.shows; //first "movies" is the name of the slice and  "shows" come from the store, a state
// the following export the reducer, getAllShows
export default movieSlice.reducer;
