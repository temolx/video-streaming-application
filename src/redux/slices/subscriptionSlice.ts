import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface subSlice {
    value: string[]
}

export const subscriptionSlice = createSlice({
    name: 'subscriptionSlice',
    initialState: { value: [] } as subSlice, // aray of channel IDs
    reducers: {
        subscribe: (state: subSlice, action: PayloadAction<string>) => {
            if (state.value.some((el) => el === action.payload)) { // already subscribed
                state.value = state.value.filter((el) => {
                    return el !== action.payload;
                })
            }
            else state.value = [action.payload, ...state.value];
        }
    }
})

export const { subscribe } = subscriptionSlice.actions