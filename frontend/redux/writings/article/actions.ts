import ActionType from '../actionType';
import { ArticleMetasWithPagination } from '../../../interfaces';

export interface SelectPageIndexAction {
    type: typeof ActionType.SelectPageIndex,
    pageIndex: number
};

const selectPageIndex = (pageIndex: number): SelectPageIndexAction => {
    return {
        type: ActionType.SelectPageIndex,
        pageIndex
    };
};

interface RequestArticleAction {
    type: typeof ActionType.FetchArticlesRequest,
    pageIndex: number
}

const requestArticles = (pageIndex: number): RequestArticleAction => {
    return {
        type: ActionType.FetchArticlesRequest,
        pageIndex
    };
};

interface FetchArticlesSuccessAction {
    type: typeof ActionType.FetchArticlesSuccess,
    pageIndex: number,
    articleMetasWithPagination: ArticleMetasWithPagination
}

const fetchArticlesSuccess = (pageIndex: number, articleMetasWithPagination: ArticleMetasWithPagination): FetchArticlesSuccessAction => {
    return {
        type: ActionType.FetchArticlesSuccess,
        pageIndex,
        articleMetasWithPagination
    }
};

interface FetchArticlesFailureAction {
    type: typeof ActionType.FetchArticlesFailure,
    pageIndex: number
}

const fetchArticlesFailure = (pageIndex: number): FetchArticlesFailureAction => {
    return {
        type: ActionType.FetchArticlesFailure,
        pageIndex
    }
}

export type ArticlesAction = RequestArticleAction | FetchArticlesSuccessAction | FetchArticlesFailureAction;

export { selectPageIndex, requestArticles, fetchArticlesSuccess, fetchArticlesFailure };