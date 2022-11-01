import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface resultType {
    value: number
}

export const ResultsAmountSlice = createSlice({
    name: 'ResultsAmountSlice',
    initialState: { value: 30 } as resultType,
    reducers: {
        setResultAmount: (state: resultType, action: PayloadAction<number>) => {
            state.value= action.payload;
        }
    }
})

export const { setResultAmount } = ResultsAmountSlice.actions