import { createSlice } from "@reduxjs/toolkit";

interface sidebarType {
    value: boolean
}

export const sidebarSlice = createSlice({
    name: 'sidebarSlice',
    initialState: { value: false } as sidebarType,
    reducers: {
        toggleSidebar: (state: sidebarType) => {
            state.value = !state.value;
        }
    }
})

export const { toggleSidebar } = sidebarSlice.actions