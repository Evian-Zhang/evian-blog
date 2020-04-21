import articlesReducer from './articleSlice';
import pageIndexReducer from './pageIndexSlice';

import { combineReducers, } from 'redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

const rootReducer = combineReducers({
    articles: articlesReducer,
    pageIndex: pageIndexReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default rootReducer;
