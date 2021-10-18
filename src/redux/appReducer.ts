
type ActionType = any

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
	status: 'idle' as RequestStatusType,
	error: null as string | null,
	isAuth: false
};

export type InitialStateType = typeof initialState
export function appReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {

	switch (action.type) {
		case "SET-CATEGORIES":
			return action.categories
		case "SET-APP-STATUS":
			return { ...state, status: action.status }

		default: return state
	}
}

export const setAppStatusAC = (status: RequestStatusType) => {
	return {
		type: "SET-APP-STATUS",
		status
	}
}