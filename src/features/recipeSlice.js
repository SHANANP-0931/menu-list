import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async (query = '') => {
    const response = await axios.get(`https://dummyjson.com/recipes`);
    return response.data.recipes;
});

const recipeSlice = createSlice({
    name: 'recipes',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default recipeSlice.reducer;
