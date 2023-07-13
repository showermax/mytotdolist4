import { Dispatch } from 'redux'
import {SetMessageType, setStatusLoading, SetStatusLoadingType} from "./AppReducer";
import {api, LoginType} from "../API/api";


const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const AuthReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (login: LoginType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusLoading('loading'))
    console.log(login)
    try {
        const result = await api.loginMe(login)
        console.log(result)
        dispatch(setStatusLoading('succeeded'))
    }
    catch (e) {

    }
    finally {
        dispatch(setStatusLoading('succeeded'))
    }
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetMessageType | SetStatusLoadingType
