export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState

export const AppReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

type SetStatusLoadingType = ReturnType<typeof setStatusLoading>
export const setStatusLoading = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}
type ActionsType = SetStatusLoadingType | ReturnType<typeof setError>

export const setError = (error: null | string) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}