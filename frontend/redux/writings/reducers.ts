import articleReducer from './article';
import tagReducer from './tag';
import seriesReducer from './series';

import { combineReducers } from 'redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

const rootReducer = combineReducers({
    article: articleReducer,
    tag: tagReducer,
    series: seriesReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default rootReducer;
