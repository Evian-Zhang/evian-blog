import { Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './reducers';

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
