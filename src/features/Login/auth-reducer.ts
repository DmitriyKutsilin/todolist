import {authApi, LoginParamsType, Result_Code} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {setAppStatusAC, setIsInitializedAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {throws} from "node:assert";

const initialState = {
    isLoggedIn: false,
}



export const authReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.payload.value}
        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', payload: {value}} as const)

export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authApi.login(data)
        if (res.data.resultCode === Result_Code.SUCCESS) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    }
    catch (e) {
        console.log(e)
        //TODO: разобраться с типизацией error при использовании try/catch
        handleServerNetworkError(dispatch, e as AxiosError)
    }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authApi.logout()
        if (res.data.resultCode === Result_Code.SUCCESS) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    }
    catch (e) {
        handleServerNetworkError(dispatch, e as AxiosError)
    }
}

export const meTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authApi.me()
        if (res.data.resultCode === Result_Code.SUCCESS) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    }
    catch (e) {
        console.log(e)
        //axios error
        handleServerNetworkError(dispatch, e as AxiosError)
    }
    dispatch(setIsInitializedAC(true))
}


// types
type InitialStateType = typeof initialState
type ActionTypes =
    | ReturnType<typeof setIsLoggedInAC>