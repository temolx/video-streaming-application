import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface commentType {
    value: string[]
}

export const likeCommentSlice = createSlice({
    name: 'likeCommentSlice',
    initialState: { value: [] } as commentType,
    reducers: {
        likeComment: (state: commentType, action: PayloadAction<string>) => {
            if (state.value.some((el) => el === action.payload)) { // comment already liked
                state.value = state.value.filter((el) => {
                    return el !== action.payload;
                })
            }
            else state.value = [action.payload, ...state.value];
        }
    }
})

export const { likeComment } = likeCommentSlice.actions