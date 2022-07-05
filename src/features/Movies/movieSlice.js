import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MovieApi from "../../common/apis/MovieApi";
import { movieApiKey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async () => {
    const searchText = "Harry";
    const response = await MovieApi.get(`?apiKey=${movieApiKey}&s=${searchText}&type="movie`)
    return response?.data;
});

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async () => {
    const seriesText = "Friends";
    const response = await MovieApi.get(`?apiKey=${movieApiKey}&s=${seriesText}&type="series`)
    return response?.data;
});

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
    'movies/fetchAsyncMovieOrShowDetail', 
    async (id) => {
    const response = await MovieApi.get(
        `?apiKey=${movieApiKey}&i=${id}&Plot=full`
        )
    return response?.data;
});

const initialState = {
    movies: {},
    shows: {},
    selectedMovieOrShow: {}
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        removeSelectedMovieOrShow: (state) => {
            state.selectedMovieOrShow = {}
        }
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            console.log("-------------pending----------")
        },
        [fetchAsyncMovies.fulfilled]: (state, {payload}) => {
            console.log("-------------fullfiled----------")
            return {...state, movies: payload}
        },
        [fetchAsyncMovies.rejected]: (state, {payload}) => {
            console.log("-------------Rejected----------")
            // return {...state, movies: payload}
        },
        [fetchAsyncShows.fulfilled]: (state, {payload}) => {
            console.log("-------------shows----------")
            return {...state, shows: payload}
        },
        [fetchAsyncMovieOrShowDetail.fulfilled]: (state, {payload}) => {
            console.log("-------------selectedMovieOrShow----------")
            return {...state, selectedMovieOrShow: payload}
        }
    }
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getAllSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow;
export default movieSlice.reducer;