import { Dispatch } from 'react';
import { API } from '../api/api';
import { AppStatusType, setAppStatusAC } from './appReducer';
import { PostType } from './postsReducer';

type SetPostType = {
	type: "SET-POST",
	post: PostType
}

type ActionType = SetPostType | AppStatusType

type AppDispatch = Dispatch<ActionType>;

const initialState = {} as PostType

export type InitialStateType = typeof initialState
export function filterReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {

	switch (action.type) {
	
		case "SET-POST":
			return action.post

		default: return state
	}
}

export function setPostAC(post: PostType) {
	return {
		type: "SET-POST",
		post
	} as const
}

export const getPostTC = (id: any) => async (dispatch: AppDispatch) => {
	dispatch(setAppStatusAC('loading'))
	await API.getPost(id)
		.then(res => {
			const post = res.data[0];
			dispatch(setPostAC(post))
			dispatch(setAppStatusAC('succeeded'))
		})
		.catch(err => console.log(err))
}