import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface searchType {
    value: string
}

export const searchSlice = createSlice({
    name: 'searchSlice',
    initialState: { value: '' } as searchType,
    reducers: {
        addSearchWord: (state: searchType, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    }
})

export const { addSearchWord } = searchSlice.actions