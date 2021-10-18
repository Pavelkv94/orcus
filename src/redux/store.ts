import { applyMiddleware, combineReducers, createStore } from "redux";
import { categoriesReducer } from "./categoriesReducer";
import { postsReducer } from "./postsReducer";
import thunk from 'redux-thunk';
import { appReducer } from './appReducer';
import { filterReducer } from './filterReducer';

const rootReducer = combineReducers({
    categories: categoriesReducer,
	posts: postsReducer,
	filter: filterReducer,
	app: appReducer

});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppStateType = ReturnType<typeof rootReducer>