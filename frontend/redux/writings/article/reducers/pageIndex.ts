import ActionType from '../../actionType';
import { SelectPageIndexAction } from '../actions';

import { Reducer } from 'redux';

const selectedPageIndex: Reducer<number, SelectPageIndexAction> = (state = 0, action) => {
    if (action.type === ActionType.SelectPageIndex) {
        return action.pageIndex;
    }
    return state;
};

export default selectedPageIndex;