import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface filterType {
    value: string
}

export const fiterSlice = createSlice({
    name: 'filterSlice',
    initialState: { value: 'video,channel' } as filterType,
    reducers: {
        checkAll: (state: filterType) => {
            state.value = 'video,channel'
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