import { Series, FetchStatus } from '../../../interfaces';
import { getSeries } from '../../../api/series-api';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const fetchSeries = createAsyncThunk(
    'series/fetchSeries',
    async () => {
        return getSeries()
    }
);

interface SeriesState {
    fetchStatus: FetchStatus,
    series: Series[]
}

const initialState: SeriesState = {
    fetchStatus: FetchStatus.Failure,
    series: []
};

const seriesSlice = createSlice({
    name: 'series',
    initialState,
    reducers: { },
    extraReducers: builder => {
        builder
            .addCase(fetchSeries.pending, (state, _) => {
                state = {
                    fetchStatus: FetchStatus.Fetching,
                    series: []
                };
            })
            .addCase(fetchSeries.fulfilled, (state, action) => {
                state = {
                    fetchStatus: FetchStatus.Success,
                    series: action.payload
                };
            })
            .addCase(fetchSeries.rejected, (state, _) => {
                state = {
                    fetchStatus: FetchStatus.Failure,
                    series: []
                };
            });
    }
});

export { fetchSeries };

export default seriesSlice.reducer;
