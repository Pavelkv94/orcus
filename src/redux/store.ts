import { applyMiddleware, combineReducers, createStore } from "redux";
import { categoriesReducer } from "./categoriesReducer";
import { postsReducer } from "./postsReducer";
import thunk from 'redux-thunk';
import { appReducer } from './appReducer';

const rootReducer = combineReducers({
    categories: categoriesReducer,
	posts: postsReducer,
	app: appReducer

});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppStateType = ReturnType<typeof rootReducer>