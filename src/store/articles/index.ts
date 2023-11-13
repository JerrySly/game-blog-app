import { SliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import { Article } from "./types";


interface ArticleState {
    selectedArticle: Article | null,
};

interface ArticleReducer extends SliceCaseReducers<ArticleState> {
    setSelectedArticle: (state: ArticleState, action:  {
        type: string,
        payload: Article | null,
    }) => void,
};

export const articles = createSlice<ArticleState, ArticleReducer, "article">({
    name: 'article',
    initialState: {
        selectedArticle: null,
    },
    reducers: {
        setSelectedArticle(state, action) {
            state.selectedArticle = action.payload;
        }
    }
})

export const {
    setSelectedArticle
} = articles.actions;

export default articles.reducer;