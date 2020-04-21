import { ArticleMeta, ArticleMetasWithPagination } from '../../../interfaces';
import { AppThunk } from '../store';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum FetchStatus {
    Fetching,
    Success,
    Failure
};

interface ArticlesStatePerPage {
    isFetching: FetchStatus,
    articles: ArticleMeta[]
}

interface ArticlesState {
    totalCount: number,
    articles: Map<number, ArticlesStatePerPage>
}

const initialState: ArticlesState = {
    totalCount: 0,
    articles: new Map()
};

const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        requestArticles: (state, action: PayloadAction<number>) => {
            state.articles.set(action.payload, {
                isFetching: FetchStatus.Fetching,
                articles: []
            });
        },
        fetchArticlesSuccess: (state, action: PayloadAction<{pageIndex: number, articleMetasWithPagination: ArticleMetasWithPagination}>) => {
            const {
                pageIndex,
                articleMetasWithPagination: {
                    totalCount,
                    articleMetas
                }
            } = action.payload;
            state.totalCount = totalCount;
            state.articles.set(pageIndex, {
                isFetching: FetchStatus.Success,
                articles: articleMetas
            });
        },
        fetchArticlesFailure: (state, action: PayloadAction<number>) => {
            state.articles.set(action.payload, {
                isFetching: FetchStatus.Failure,
                articles: []
            });
        }
    }
});

export const { requestArticles, fetchArticlesSuccess, fetchArticlesFailure } = articleSlice.actions;

export default articleSlice.reducer;
