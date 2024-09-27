import { logger } from "redux-logger";
import { applyMiddleware, combineReducers, createStore } from "redux";

import { categoriesReducer } from "./categoriesReducer";
import { postsReducer } from "./postsReducer";
import thunk, { ThunkDispatch } from "redux-thunk";
import { appReducer } from "./appReducer";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  posts: postsReducer,
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

//@ts-ignore
export const store = createStore(rootReducer, applyMiddleware(thunk, logger));


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppDispatch = ThunkDispatch<RootState, any, any>;

export type AppStateType = ReturnType<typeof rootReducer>;
