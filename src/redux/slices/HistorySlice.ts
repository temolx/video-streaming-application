import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type historyInfo = {
    id: string,
    title: string,
    thumbnail: string
}

interface historyType {
    value: historyInfo[]
}

export const historySlice = createSlice({
    name: 'historySlice',
    initialState: { value: [] } as historyType,
    reducers: {
        addHistory: (state: historyType, action: PayloadAction<historyInfo>) => { // receives video id
            state.value = [...state.value, action.payload];
        }
    }
})

export const { addHistory } = historySlice.actions
