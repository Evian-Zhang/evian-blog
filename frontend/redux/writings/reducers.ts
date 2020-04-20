import articles from './article/reducers';

import { combineReducers } from 'redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

const rootReducer = combineReducers({
    articles
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default rootReducer;
