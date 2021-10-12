type ActionType = any
const initialState:any = []
export type InitialStateType = typeof initialState
export function postsReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {
    // console.log(action)
    switch (action.type) {
        case "INC-COUNTER-VALUE":
            return []
        
        default: return state
    }
}

export function incCounterValueAC() {
    return {
        type: "INC-COUNTER-VALUE"
    } as const
}

export function resetCounterValueAC() {
    return {
        type: "RESET-COUNTER-VALUE"
    } as const
}
export function maxValueAC(maxValue: number) {
    return {
        type: "MAX-COUNTER-VALUE",
        maxValue,
    } as const
}
export function startValueAC(startValue: number) {
    return {
        type: "START-COUNTER-VALUE",
        startValue,
    } as const
}
export function setValueAC() {
    return {
        type: "SET-COUNTER-VALUE",
    } as const
}
