import { API } from "../api/api";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

type ActionType = any;

const initialState = {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    info: '',
    isAuth: false,
    user: {} as any,
    role: "" as string,
};

export type InitialStateType = typeof initialState;
export function appReducer(
    state: InitialStateType = initialState,
    action: ActionType
): InitialStateType {
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
            return {...state, info: 'You registration is successful!'}
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

export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: "SET-APP-STATUS",
        status,
    };
};

const setAppErrAC = (err: string) => {
    return {
        type: "SET-APP-ERR",
        err,
    };
};

const setAppAuthAC = (user?: any) => {
    return {
        type: "SET-APP-AUTH",
        user,
    };
};
const meAC = () => ({
    type: "SET_ME",
});
const infoAC = () => ({
    type: "INFO",
});
const meDataAC = (payload: any) => ({
    type: "SET_ME_DATA",
    payload,
});

export const logoutAC = () => ({
    type: "LOGOUT",
});

export const loginTC = (payload: any) => async (dispatch: any) => {
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
        .catch((e) =>
            dispatch(
                setAppErrAC(
                    e.response
                        ? e.response.data.message
                        : "Server is not available"
                )
            )
        );
};

export const registrationTC = (payload: any) => (dispatch: any) => {
    dispatch(setAppStatusAC("loading"));
    API.registration(payload)
        .then((res) => {
            dispatch(setAppStatusAC("succeeded"));
            dispatch(infoAC())
        })
        .catch((e) =>
            dispatch(
                setAppErrAC(
                    e.response
                        ? e.response.data.message
                        : "Server is not available"
                )
            )
        );
};

export const meTC = (username: string | null) => (dispatch: any) => {
    dispatch(setAppStatusAC("loading"));

    API.me(username)
        .then((res) => {
            dispatch(meAC());
            console.log(res);
            dispatch(meDataAC(res.data));
            dispatch(setAppStatusAC("succeeded"));
        })
        .catch((e) =>
            dispatch(
                setAppErrAC(
                    e.response
                        ? e.response.data.message
                        : "Server is not available"
                )
            )
        );
};
