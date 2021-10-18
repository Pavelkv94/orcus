import { API } from '../api/api';
import { setAppStatusAC } from './appReducer';
import { PostType } from './postsReducer';
type ActionType = any

const initialState = {
	filterPosts: [] as Array<PostType>,
	post: {} as PostType
}
export type InitialStateType = typeof initialState
export function filterReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {

	switch (action.type) {
		case "SET-FILTER-POSTS":
			return { ...state, filterPosts: action.posts }
		case "SET-POST":
			return { ...state, post: action.post }

		default: return state
	}
}

export function setPostsAC(posts: any) {
	return {
		type: "SET-FILTER-POSTS",
		posts
	} as const
}

export function setPostAC(post: PostType) {
	return {
		type: "SET-POST",
		post
	} as const
}

export const getFilterPostsTC = (category: string) => (dispatch: any) => {
	dispatch(setAppStatusAC('loading'))
	API.getFilterPosts(category)
		.then(res => {
			const posts = res.data;
			dispatch(setPostsAC(posts))
			dispatch(setAppStatusAC('succeeded'))
		})
		.catch(err => console.log(err))
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