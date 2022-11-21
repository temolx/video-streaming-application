import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface historyType {
    value: string[]
}

export const historySlice = createSlice({
    name: 'historySlice',
    initialState: { value: [] } as historyType,
    reducers: {
        addHistory: (state: historyType, action: PayloadAction<string>) => { // receives video id
            state.value = [...state.value, action.payload];
        }
    }
})

export const { addHistory } = historySlice.actions
