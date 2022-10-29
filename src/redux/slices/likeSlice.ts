import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface likeSlice {
    value: string[]
}

export const likeSlice = createSlice({
    name: 'likeSlice',
    initialState: { value: [] } as likeSlice, // array of video IDs
    reducers: {
        like: (state: likeSlice, action: PayloadAction<string>) => {
            if (state.value.some((el) => el === action.payload)) { // video already liked
                state.value = state.value.filter((el) => {
                    return el !== action.payload;
                })
            }
            else state.value = [action.payload, ...state.value];
        }
    }
})

export const { like } = likeSlice.actions