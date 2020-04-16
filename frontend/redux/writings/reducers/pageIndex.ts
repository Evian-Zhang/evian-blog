import ActionType from '../actionType'

import {Action, Reducer} from 'redux'

const INITIAL_PAGE_INDEX = 0;

export interface PageIndexAction extends Action<ActionType> {
    payload: number
};

const pageIndex: Reducer<number, PageIndexAction> = (state = INITIAL_PAGE_INDEX, action) => {
    if (action.type === ActionType.PageIndex) {
        return action.payload
    }
    return state;
};

export default pageIndex;