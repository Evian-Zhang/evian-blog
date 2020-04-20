import ActionType from '../../actionType';
import { ArticleMeta } from '../../../../interfaces';
import { ArticlesAction } from '../actions';

import { Reducer } from 'redux';

enum FetchStatus {
    Fetching,
    Success,
    Failure
}

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

const articlesByPageIndex: Reducer<ArticlesState, ArticlesAction> = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.FetchArticlesRequest: 
            return Object.assign({}, state, {
                articles: state.articles.set(action.pageIndex, {
                    isFetching: FetchStatus.Fetching,
                    articles: []
                })
            });
        
        case ActionType.FetchArticlesSuccess:
            return Object.assign({}, state, {
                totalCount: action.articleMetasWithPagination.totalCount,
                articles: state.articles.set(action.pageIndex, {
                    isFetching: FetchStatus.Success,
                    articles: action.articleMetasWithPagination.articleMetas
                })
            });

        case ActionType.FetchArticlesFailure:
            return Object.assign({}, state, {
                articles: state.articles.set(action.pageIndex, {
                    isFetching: FetchStatus.Failure,
                    articles: []
                })
            });

        default:
            return state;
    }
};

export default articlesByPageIndex;