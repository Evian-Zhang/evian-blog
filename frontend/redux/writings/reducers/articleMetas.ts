import ActionType from '../actionType';
import { ArticleMetasWithPagination } from '../../../interfaces';

import {Action, Reducer} from 'redux';

export interface ArticleMetasAction extends Action<ActionType> {
    payload: ArticleMetasWithPagination
};

const articleMetas: Reducer<ArticleMetasWithPagination, ArticleMetasAction> = (state = null, action) => {
    if (action.type === ActionType.ArticleMetas) {
        return action.payload
    }
    return state;
};

export default articleMetas;