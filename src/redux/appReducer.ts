import { AxiosError } from 'axios';
import { API } from '../api/api';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

type ActionType = any

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
		case "SET-APP-AUTH":
			return { ...state, isAuth: action.auth }

		default: return state
	}
}

export const setAppStatusAC = (status: RequestStatusType) => {
	return {
		type: "SET-APP-STATUS",
		status
	}
}

export const setAppAuthAC = (auth: boolean) => {
	return {
		type: "SET-APP-AUTH",
		auth
	}
}

export const loginTC = (pass: any) => (dispatch: any) => {
    // dispatch(setAppStatusAC({ status: 'loading' }))
    API.login(pass)
        .then(res => console.log(res))
        .catch((err: AxiosError) => {
            // handleServerNetworkError(dispatch, err.message)
        })
};