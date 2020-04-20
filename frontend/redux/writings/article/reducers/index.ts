import selectedPageIndex from './pageIndex';
import articlesByPageIndex from './articles';

import { combineReducers } from 'redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

const rootReducer = combineReducers({
    selectedPageIndex,
    articlesByPageIndex
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default rootReducer;
