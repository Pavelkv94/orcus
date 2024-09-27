import { Dispatch } from "react";
import { API } from "../api/api";
import { CredentialsType } from "../components/Login/Login";
import { message } from "antd";

export type RequestStatusType = "pending" | "fulfilled" | "rejected";

type UserType = {
  id: string;
  roles: string[];
  token: string;
  username: string;
};

type SetUserType = {
  type: "SET-USER";
  user: UserType;
};

type ActionType = SetUserType;

type AppDispatch = Dispatch<ActionType>;

const initialState = {
  user: {} as UserType,
};

export type InitialStateType = typeof initialState;

export function appReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {
  switch (action.type) {
    case "SET-USER":
      return { ...state, user: action.user };

    default:
      return state;
  }
}

const setUserAC = (user: UserType): SetUserType => {
  return {
    type: "SET-USER",
    user,
  };
};
export const loginTC = (payload: object) => async (dispatch: AppDispatch) => {
  await API.login(payload)
    .then((res) => {
      dispatch(setUserAC(res.data));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
    })
    .catch((err) => {
      err.response?.data
        ? err.response.data.errorsMessages.forEach((e: { message: string }) => message.error(e.message))
        : message.error("Server is not available");
    });
};

export const registrationTC = (payload: CredentialsType) => () => {
  API.registration(payload)
    .then((res) => {
      message.success(res.data.message);
    })
    .catch((err) => {
      err.response.data
        ? err.response.data.errorsMessages.forEach((e: { message: string }) => message.error(e.message))
        : message.error("Server is not available");
    });
};

export const getMeTC = (username: string | null) => async (dispatch: AppDispatch) => {
  await API.me(username)
    .then((res) => {
      dispatch(setUserAC(res.data));

      localStorage.setItem("username", res.data.username);
    })
    .catch((err) => {
      err.response?.data
        ? err.response.data.errorsMessages.forEach((e: { message: string }) => message.error(e.message))
        : message.error("Server is not available");
    });
};
