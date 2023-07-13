export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type MessageType = {
    messageText: string,
    typeOfMessage: 'success' | 'warning' | 'error'
}

const initialState = {
    status: 'loading' as RequestStatusType,
    message: null as MessageType | null

}

type InitialStateType = typeof initialState

export const AppReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-MESSAGE':
            return {...state, message:  action.message ? {...state.message, messageText: action.message.messageText, typeOfMessage: action.message.typeOfMessage} : action.message}
        default:
            return state
    }
}

export type SetStatusLoadingType = ReturnType<typeof setStatusLoading>
export const setStatusLoading = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}
type ActionsType = SetStatusLoadingType | SetMessageType

export type SetMessageType = ReturnType<typeof setMessage>
export const setMessage = (message: MessageType | null) => {
    return {
        type: 'APP/SET-MESSAGE',
        message
    } as const
}