import {applyMiddleware, combineReducers, legacy_createStore, UnknownAction} from "redux";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

//TODO спросить о ошибке legacy_createStore

// @ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, UnknownAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store