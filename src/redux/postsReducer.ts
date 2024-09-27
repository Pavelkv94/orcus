import { Dispatch } from "react";
import { API } from "../api/api";
import { message } from "antd";

export type PostType = {
  _id: string;
  title: string;
  text: string;
  category: string;
};
export type ShortPostType = {
  _id: string;
  title: string;
  category: string;
};
type SetPostsAction = {
  type: "SET-POSTS";
  posts: PostType[];
};

type SetPostAction = {
  type: "SET-POST";
  post: PostType;
};

type ResetPostAction = {
  type: "RESET-POST";
};

type SetShortPostsAction = {
  type: "SET-SHORT-POSTS";
  shortPosts: ShortPostType[];
};

type ActionType = SetPostsAction | SetShortPostsAction | SetPostAction | ResetPostAction;

type AppDispatch = Dispatch<ActionType>;

const initialState = {
  posts: [] as Array<PostType>,
  shortPosts: [] as Array<ShortPostType>,
  post: {} as PostType,
};
export type InitialStateType = typeof initialState;
export function postsReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {
  switch (action.type) {
    case "SET-POSTS":
      return { ...state, posts: action.posts };
    case "RESET-POST":
      return { ...state, post: {} as PostType };
    case "SET-POST":
      return { ...state, post: action.post };
    case "SET-SHORT-POSTS":
      return { ...state, shortPosts: action.shortPosts.sort((a: ShortPostType, b: ShortPostType) => (a.title > b.title ? 1 : -1)) };

    default:
      return state;
  }
}

function setPostAC(post: PostType): SetPostAction {
  return {
    type: "SET-POST",
    post,
  } as const;
}

export function resetPostAC(): ResetPostAction {
  return {
    type: "RESET-POST",
  } as const;
}

function setShortPostsAC(shortPosts: ShortPostType[]): SetShortPostsAction {
  return {
    type: "SET-SHORT-POSTS",
    shortPosts,
  } as const;
}

export const getPostTC = (id: string) => (dispatch: AppDispatch) => {
  API.getPost(id)
    .then((res) => {
      const post = res.data;
      dispatch(setPostAC(post));
    })
    .catch((err) => console.log(err));
};

export const getShortPostsTC = () => (dispatch: AppDispatch) => {
  API.getShortPosts()
    .then((res) => {
      const posts = res.data;
      dispatch(setShortPostsAC(posts));
    })
    .catch((err) => console.log(err));
};

export const createPostsTC = (title: string, category: string, text: string) => (dispatch: AppDispatch) => {
  API.createPost(title, category, text)
    .then(() => {
      message.success("Success");
      //@ts-ignore
      dispatch(getShortPostsTC());
    })
    .catch((err) => console.log(err));
};

export const editPostsTC = (title: string, category: string, text: string, id: string) => () => {
  API.editPost(title, category, text, id)
    .then(() => {
      message.success("Success");
    })
    .catch((err) => console.log(err));
};

export const deletePostsTC = (id: string) => (dispatch: AppDispatch) => {
  API.deletePost(id)
    .then(() => {
      message.success("Success");
      //@ts-ignore
      dispatch(getShortPostsTC());
    })
    .catch((err) => console.log(err));
};
