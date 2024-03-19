import { PayloadAction, SliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import { Article } from "./types";
import { loadPosts } from '../../api/post';


interface ArticleState {
    selectedArticle: Article | null,
    page: number,
    pageAmount: number,
    isLoaded: boolean,
    articles: Array<Article>,
};

interface ArticleReducer extends SliceCaseReducers<ArticleState> {
    setSelectedArticle: (state: ArticleState, action:  {
        type: string,
        payload: Article | null,
    }) => void,
    setArticles: (state: ArticleState, action: PayloadAction<{rows: Array<Article>, count: number }>) => void
};

export const articles = createSlice<ArticleState, ArticleReducer, "article">({
    name: 'article',
    initialState: {
        selectedArticle: null,
        articles: [],
        isLoaded: false,
        page: 1,
        pageAmount: 9,
    },
    reducers: {
        setSelectedArticle(state, action) {
            state.selectedArticle = action.payload;
        },
        setArticles(state, action) {
            state.articles = [...state.articles, ...action.payload.rows];
            state.page += 1;
            if (action.payload.count <= state.articles.length) state.isLoaded = true;
        }
    }
})

export const {
    setSelectedArticle,
    setArticles,
} = articles.actions;

export default articles.reducer;