import { configureStore } from "@reduxjs/toolkit";
import { searchSlice } from "./slices/SearchSlice";
import { sidebarSlice } from "./slices/SidebarSlice";
import { fiterSlice } from "./slices/FilterSlice";
import { likeSlice } from "./slices/likeSlice";
import { subscriptionSlice } from "./slices/subscriptionSlice";
import { likeCommentSlice } from "./slices/likeCommentSlice";
import { ResultsAmountSlice } from "./slices/ResultsAmountSlice";
import { historySlice } from "./slices/HistorySlice";

const store = configureStore({
    reducer: {
        searchFilter: searchSlice.reducer,
        sidebarStatus: sidebarSlice.reducer,
        filters: fiterSlice.reducer,
        likedVideos: likeSlice.reducer,
        subscriptions: subscriptionSlice.reducer,
        likedComments: likeCommentSlice.reducer,
        resultsAmount: ResultsAmountSlice.reducer,
        history: historySlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store