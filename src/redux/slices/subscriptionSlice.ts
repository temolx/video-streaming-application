import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface payloadType {
    channelId: string,
    channelName: string
}

interface subSlice {
    value: payloadType[]
}

export const subscriptionSlice = createSlice({
    name: 'subscriptionSlice',
    initialState: { value: [{
        channelId: 'UC-J-KZfRV8c13fOCkhXdLiQ',
        channelName: 'Dua Lipa'
    }] } as subSlice, // aray of channel IDs
    reducers: {
        subscribe: (state: subSlice, action: PayloadAction<payloadType>) => {
            if (state.value.some((el) => el.channelId === action.payload.channelId)) { // already subscribed
                state.value = state.value.filter((el) => {
                    return el.channelId !== action.payload.channelId;
                })
            }
            else state.value = [action.payload, ...state.value];
        }
    }
})

export const { subscribe } = subscriptionSlice.actions