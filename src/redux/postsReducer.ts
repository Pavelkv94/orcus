import { API } from '../api/api';
import { setAppStatusAC } from './appReducer';
export type PostType = {
	_id: string
	title: string
	slug: string
	text: string
	category: string
	__v: number
}
type ActionType = any
const initialState = [] as Array<PostType>
export type InitialStateType = typeof initialState
export function postsReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {

	switch (action.type) {
		case "SET-POSTS":
			return action.posts
		default: return state
	}
}

export function setPostsAC(posts: any) {
	return {
		type: "SET-POSTS",
		posts
	} as const
}

export const getPostsTC = () => (dispatch: any) => {
	dispatch(setAppStatusAC('loading'))
	API.getPosts()
		.then(res => {
			const posts = res.data;
			dispatch(setPostsAC(posts))
			dispatch(setAppStatusAC('succeeded'))
		})
		.catch(err => console.log(err))
}

export const createPostsTC = (slug: string, title: string, category: string, text: string) => (dispatch: any) => {
	dispatch(setAppStatusAC('loading'))
	API.createPost(slug, title, category, text)
		.then(res => {
			dispatch(setAppStatusAC('succeeded'))

		})
		.catch(err => console.log(err))
}
