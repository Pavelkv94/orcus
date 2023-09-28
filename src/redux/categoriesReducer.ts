import { Dispatch } from "react";
import { API } from "../api/api";
import { AppStatusType, setAppStatusAC } from "./appReducer";

type SetCategoriesType = {
  type: "SET-CATEGORIES";
  categories: CategoryType[];
};
type AddCategoriesType = {
  type: "ADD-CATEGORIES";
  category: CategoryType;
};

type ActionType = SetCategoriesType | AddCategoriesType | AppStatusType;

type AppDispatch = Dispatch<ActionType>;

export type CategoryType = {
  title: string;
  posts: [string];
  __v: number;
  _id: string;
};
const initialState: Array<CategoryType> = [];

export type InitialStateType = typeof initialState;
export function categoriesReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {
  switch (action.type) {
    case "SET-CATEGORIES":
      return action.categories.sort((a: CategoryType, b: CategoryType) => (a.title > b.title ? 1 : -1));
    case "ADD-CATEGORIES":
      return [...state, action.category];
    default:
      return state;
  }
}

export function setCategoriesAC(categories: CategoryType[]) {
  return {
    type: "SET-CATEGORIES",
    categories,
  } as const;
}
export function addCategoriesAC(category: CategoryType) {
  return {
    type: "ADD-CATEGORIES",
    category,
  } as const;
}

export const getCategoriesTC = () => (dispatch: AppDispatch) => {
  // dispatch(setAppStatusAC('loading'))
  API.getCategories()
    .then((res) => {
      const categories = res.data;
      dispatch(setCategoriesAC(categories));
      dispatch(setAppStatusAC("succeeded"));
    })
    .catch((err) => console.log(err));
};

export const addCategoriesTC = (title: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"));
  API.createCategory(title)
    .then(() => {
      dispatch(setAppStatusAC("succeeded"));
    })
    .catch(() => console.log("err"));
};

// export const addPostToCategoriesTC = (post: string, category: string) => (dispatch: any) => {
// 	dispatch(setAppStatusAC('loading'))
// 	API.addPostToCategory(post, category)
// 		.then(res => {
// 			dispatch(setAppStatusAC('succeeded'))
// 		})
// 		.catch(err => console.log("err"))
// }
