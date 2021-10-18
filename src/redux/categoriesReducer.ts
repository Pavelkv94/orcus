import { API } from "../api/api"
import { setAppStatusAC } from "./appReducer"

type ActionType = any

export type CategoryType = {
	title: string
	__v: number
	_id: string
}
const initialState: Array<CategoryType> = []

export type InitialStateType = typeof initialState
export function categoriesReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {

	switch (action.type) {
		case "SET-CATEGORIES":
			return action.categories
		case "ADD-CATEGORIES":
			return [...state, action.category]
		default: return state
	}
}

export function setCategoriesAC(categories: any) {
	return {
		type: "SET-CATEGORIES",
		categories
	} as const
}
export function addCategoriesAC(category: CategoryType) {
	return {
		type: "ADD-CATEGORIES",
		category
	} as const
}

export const getCategoriesTC = () => (dispatch: any) => {
	// dispatch(setAppStatusAC('loading'))
	API.getCategories()
		.then(res => {
			const categories = res.data;
			dispatch(setCategoriesAC(categories))
			dispatch(setAppStatusAC('succeeded'))

		})
		.catch(err => console.log(err))
}

export const addCategoriesTC = (title: string) => (dispatch: any) => {
	dispatch(setAppStatusAC('loading'))
	API.createCategory(title)
		.then(res => {
			dispatch(setAppStatusAC('succeeded'))
		})
		.catch(err => console.log("err"))
}
