import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface filterType {
    value: string
}

export const fiterSlice = createSlice({
    name: 'filterSlice',
    initialState: { value: '' } as filterType,
    reducers: {
        checkAll: (state: filterType) => {
            state.value = ''
        },
        checkVideos: (state: filterType) => {
            state.value = 'video'
        },
        checkChannels: (state: filterType) => {
            state.value = 'channel'
        }
    }
})

export const { checkAll, checkVideos, checkChannels } = fiterSlice.actions