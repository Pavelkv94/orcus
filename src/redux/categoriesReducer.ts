import { catAPI } from "../api/api"

type ActionType = any

const initialState: any = []

export type InitialStateType = typeof initialState
export function categoriesReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {

	switch (action.type) {
		case "SET-CATEGORIES":
			return [...state, action.categories]

		default: return state
	}
}

export function setCategoriesAC(categories: any) {
	return {
		type: "SET-CATEGORIES",
		categories
	} as const
}

export const getThunk = () => (dispatch: any) => {
	catAPI.getCat()
		.then(res => {
			const categories = res.data;
			dispatch(setCategoriesAC({ categories: categories }))

		})
		.catch(err => console.log(err))
}
