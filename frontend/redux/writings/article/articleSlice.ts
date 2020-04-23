import { ArticleMeta, FetchStatus } from '../../../interfaces';
import { getArticleMetas } from '../../../api/article-api';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const fetchArticles = createAsyncThunk(
    'articles/fetchArticles',
    async (arg: { pageIndex: number, pageSize: number }) => {
        return getArticleMetas(arg.pageIndex, arg.pageSize)
    }
);

interface ArticlesStatePerPage {
    fetchStatus: FetchStatus,
    articles: ArticleMeta[]
}

interface ArticlesState {
    totalCount: number,
    articles: ArticlesStatePerPage[]
}

const initialState: ArticlesState = {
    totalCount: 0,
    articles: []
};

const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: { },
    extraReducers: builder => {
        builder
            .addCase(fetchArticles.pending, (state, action) => {
                state.articles[action.meta.arg.pageIndex] = {
                    fetchStatus: FetchStatus.Fetching,
                    articles: []
                };
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.totalCount = action.payload.totalCount;
                state.articles[action.meta.arg.pageIndex] = {
                    fetchStatus: FetchStatus.Success,
                    articles: action.payload.articleMetas
                };
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.articles[action.meta.arg.pageIndex] = {
                    fetchStatus: FetchStatus.Failure,
                    articles: []
                };
            });
    }
});

export { fetchArticles };

export default articleSlice.reducer;
