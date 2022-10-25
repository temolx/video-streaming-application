import { configureStore } from "@reduxjs/toolkit";
import { searchSlice } from "./slices/SearchSlice";
import { sidebarSlice } from "./slices/SidebarSlice";
import { fiterSlice } from "./slices/FilterSlice";

const store = configureStore({
    reducer: {
        searchFilter: searchSlice.reducer,
        sidebarStatus: sidebarSlice.reducer,
        filters: fiterSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store