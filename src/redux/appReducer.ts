import { Dispatch } from "react";
import { API } from "../api/api";
import { CredentialsType } from "../components/Login/Login";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type UserType = {
  id: string;
  role: string;
  token: string;
  username: string;
};

type UserTypeFromBack = {
    id: string;
    role: string[];
    token: string;
    username: string;
  };

type SetAppErrType = {
  type: "SET-APP-ERR";
  err: string;
};

type SetAppAuthType = {
  type: "SET-APP-AUTH";
  user: UserTypeFromBack;
};

type MeType = {
  type: "SET_ME";
};

type InfoType = {
  type: "INFO";
};
type MeDataType = {
  type: "SET_ME_DATA";
  payload: UserType;
};

type LogoutAC = {
  type: "LOGOUT";
};

export type AppStatusType = {
  type: "SET-APP-STATUS";
  status: RequestStatusType;
};

type ActionType = SetAppErrType | SetAppAuthType | MeType | InfoType | MeDataType | LogoutAC | AppStatusType;

type AppDispatch = Dispatch<ActionType>;

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  info: "",
  isAuth: false,
  user: {} as any,
  role: "" as string,
};

export type InitialStateType = typeof initialState;

export function appReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {
  switch (action.type) {
    case "SET-APP-STATUS":
      return { ...state, status: action.status };
    case "SET-APP-AUTH":
      return { ...state, user: action.user, role: action.user.role[0] };
    case "SET-APP-ERR":
      return { ...state, error: action.err };
    case "SET_ME":
      return { ...state, isAuth: true };
    case "LOGOUT":
      return { ...state, isAuth: false };
    case "INFO": {
      return { ...state, info: "You registration is successful!" };
    }
    case "SET_ME_DATA":
      return {
        ...state,
        role: action.payload.role,
        user: { ...state.user, username: action.payload.username },
      };

    default:
      return state;
  }
}

export const setAppStatusAC = (status: RequestStatusType): AppStatusType => {
  return {
    type: "SET-APP-STATUS",
    status,
  };
};

const setAppErrAC = (err: string): SetAppErrType => {
  return {
    type: "SET-APP-ERR",
    err,
  };
};

const setAppAuthAC = (user: UserTypeFromBack): SetAppAuthType => {
  return {
    type: "SET-APP-AUTH",
    user,
  };
};
const meAC = (): MeType => ({
  type: "SET_ME",
});
const infoAC = ():InfoType => ({
  type: "INFO",
});
const meDataAC = (payload: UserType):MeDataType => ({
  type: "SET_ME_DATA",
  payload,
});

export const logoutAC = () => ({
  type: "LOGOUT",
});

export const loginTC = (payload: object) => async (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"));
  await API.login(payload)
    .then((res) => {
      dispatch(setAppAuthAC(res.data));
      //@ts-ignore
      localStorage.setItem("token", res.data.token);
      //@ts-ignore
      localStorage.setItem("user", res.data.username);
      //@ts-ignore
      localStorage.setItem("role", res.data.role);
    })
    .then(() => {
      dispatch(meAC());
      dispatch(setAppStatusAC("succeeded"));
    })
    .catch((e) => dispatch(setAppErrAC(e.response ? e.response.data.message : "Server is not available")));
};

export const registrationTC = (payload: CredentialsType) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"));
  API.registration(payload)
    .then(() => {
      dispatch(setAppStatusAC("succeeded"));
      dispatch(infoAC());
    })
    .catch((e) => dispatch(setAppErrAC(e.response ? e.response.data.message : "Server is not available")));
};

export const meTC = (username: string | null) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("loading"));

  API.me(username)
    .then((res) => {
      dispatch(meAC());
      console.log(res);
      dispatch(meDataAC(res.data));
      dispatch(setAppStatusAC("succeeded"));
    })
    .catch((e) => dispatch(setAppErrAC(e.response ? e.response.data.message : "Server is not available")));
};
