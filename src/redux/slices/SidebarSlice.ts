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
        },
        hideSidebar: (state: sidebarType) => {
            state.value = false;
        }
    }
})

export const { toggleSidebar, hideSidebar } = sidebarSlice.actions