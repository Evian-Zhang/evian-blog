import { Tag, FetchStatus } from 'interfaces';
import { getTags } from 'api/writings/tag-api';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const fetchTags = createAsyncThunk(
    'tags/fetchTags',
    async () => {
        return getTags()
    }
);

interface TagsState {
    fetchStatus: FetchStatus,
    tags: Tag[]
}

const initialState: TagsState = {
    fetchStatus: FetchStatus.Failure,
    tags: []
};

// see https://stackoveflow.com/questions/33828267
// and https://redux-toolkit.js.org/api/createReducer#direct-state-mutation
const tagSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: { },
    extraReducers: builder => {
        builder
            .addCase(fetchTags.pending, (state, _) => {
                return Object.assign({}, state, {
                    fetchStatus: FetchStatus.Fetching,
                    tags: []
                });
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                return Object.assign({}, state, {
                    fetchStatus: FetchStatus.Success,
                    tags: action.payload
                });
            })
            .addCase(fetchTags.rejected, (state, _) => {
                return Object.assign({}, state, {
                    fetchStatus: FetchStatus.Failure,
                    tags: []
                });
            });
    }
});

export { fetchTags };

export default tagSlice.reducer;
