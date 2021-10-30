import { API } from '../api/api';
import { setAppStatusAC } from './appReducer';
import { PostType } from './postsReducer';
type ActionType = any

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

export const getPostTC = (id: string) => (dispatch: any) => {
	dispatch(setAppStatusAC('loading'))
	API.getPost(id)
		.then(res => {
			const post = res.data[0];
			dispatch(setPostAC(post))
			dispatch(setAppStatusAC('succeeded'))
		})
		.catch(err => console.log(err))
}