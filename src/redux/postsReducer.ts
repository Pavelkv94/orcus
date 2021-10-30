import { API } from '../api/api';
import { setAppStatusAC } from './appReducer';
export type PostType = {
	_id: string
	title: string
	text: string
	category: string
	__v: number
}
export type ShortPostType = {
	_id: string
	title: string
	category: string
}
type ActionType = any
const initialState = {
	posts: [] as Array<PostType>,
	shortPosts: [] as Array<ShortPostType>
}
export type InitialStateType = typeof initialState
export function postsReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {

	switch (action.type) {
		case "SET-POSTS":
			return { ...state, posts: action.posts }
		case "SET-SHORT-POSTS":
			return { ...state, shortPosts: action.shortPosts.sort((a:ShortPostType,b:ShortPostType)=>a.title>b.title ? 1 : -1) }
		default: return state
	}
}

export function setPostsAC(posts: any) {
	return {
		type: "SET-POSTS",
		posts
	} as const
}

export function setShortPostsAC(shortPosts: any) {
	return {
		type: "SET-SHORT-POSTS",
		shortPosts
	} as const
}

//unOptimazed
const getPostsTC = () => (dispatch: any) => {
	dispatch(setAppStatusAC('loading'))
	API.getPosts()
		.then(res => {
			const posts = res.data;
			dispatch(setPostsAC(posts))
			dispatch(setAppStatusAC('succeeded'))
		})
		.catch(err => console.log(err))
}

export const getShortPostsTC = () => (dispatch: any) => {
	dispatch(setAppStatusAC('loading'))
	API.getShortPosts()
		.then(res => {
			const posts = res.data;
			dispatch(setShortPostsAC(posts))
			dispatch(setAppStatusAC('succeeded'))
		})
		.catch(err => console.log(err))
}

export const createPostsTC = (title: string, category: string, text: string) => (dispatch: any) => {
	dispatch(setAppStatusAC('loading'))
	API.createPost(title, category, text)
		.then(res => {
			dispatch(setAppStatusAC('succeeded'))

		})
		.catch(err => console.log(err))
}

