import { applyMiddleware, combineReducers, createStore } from "redux";
import { categoriesReducer } from "./categoriesReducer";
import { postsReducer } from "./postsReducer";
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    categories: categoriesReducer,
	posts: postsReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppStateType = ReturnType<typeof rootReducer>