import { Series, FetchStatus } from 'interfaces';
import { getSeries } from 'api/writings/series-api';

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

// see https://stackoveflow.com/questions/33828267
// and https://redux-toolkit.js.org/api/createReducer#direct-state-mutation
const seriesSlice = createSlice({
    name: 'series',
    initialState,
    reducers: { },
    extraReducers: builder => {
        builder
            .addCase(fetchSeries.pending, (state, _) => {
                return Object.assign({}, state, {
                    fetchStatus: FetchStatus.Fetching,
                    series: []
                });
            })
            .addCase(fetchSeries.fulfilled, (state, action) => {
                return Object.assign({}, state, {
                    fetchStatus: FetchStatus.Success,
                    series: action.payload
                });
            })
            .addCase(fetchSeries.rejected, (state, _) => {
                return Object.assign({}, state, {
                    fetchStatus: FetchStatus.Failure,
                    series: []
                });
            });
    }
});

export { fetchSeries };

export default seriesSlice.reducer;
