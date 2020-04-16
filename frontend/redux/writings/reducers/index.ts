import pageIndex from './pageIndex'

import { combineReducers } from 'redux'
import { useSelector, TypedUseSelectorHook } from 'react-redux'

const rootReducer = combineReducers({
    pageIndex
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default rootReducer;
