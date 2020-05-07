import { Tag, FetchStatus } from '../../../interfaces';
import { getTags } from '../../../api/writings/tag-api';

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

const tagSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: { },
    extraReducers: builder => {
        builder
            .addCase(fetchTags.pending, (state, _) => {
                state = {
                    fetchStatus: FetchStatus.Fetching,
                    tags: []
                };
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state = {
                    fetchStatus: FetchStatus.Success,
                    tags: action.payload
                };
            })
            .addCase(fetchTags.rejected, (state, _) => {
                state = {
                    fetchStatus: FetchStatus.Failure,
                    tags: []
                };
            });
    }
});

export { fetchTags };

export default tagSlice.reducer;
