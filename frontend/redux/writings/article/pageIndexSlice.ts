import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const pageIndexSlice = createSlice({
    name: 'pageIndex',
    initialState: 0,
    reducers: {
        selectPageIndex: (_, action: PayloadAction<number>) => action.payload
    }
});

export const { selectPageIndex } = pageIndexSlice.actions;

export default pageIndexSlice.reducer;