import {v1} from "uuid";
import {Result_Code, todolistApi, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {ChangeTaskEntityStatus, changeTaskEntityStatusAC} from "./tasks-reducer";

export let todolistID1 = v1()
export let todolistID2 = v1()

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.id)
        case 'ADD-TODOLIST':
            return [{...action.payload.todolist, filter: "all", entityStatus: "idle"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.payload.id ? {...tl, entityStatus: action.payload.entityStatus} : tl)
        default:
            return state;
    }
}

//ACTION CREATORS
export const removeTodolistAC = (id: string) =>
    ({type: "REMOVE-TODOLIST", payload: {id}} as const)
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: "ADD-TODOLIST", payload: {todolist}} as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: "CHANGE-TODOLIST-TITLE", payload: {id, title}} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterType) =>
    ({type: "CHANGE-TODOLIST-FILTER", payload: {id, filter}} as const)
export const setTodolistsAC = (todolists: TodolistType[]) =>
    ({type: "SET-TODOLISTS", payload: {todolists}} as const)
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', payload: {id, entityStatus}} as const)


//THUNKS
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(err => {
            handleServerNetworkError(dispatch, err)
        })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    dispatch(changeTaskEntityStatusAC('loading', todolistId))
    todolistApi.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
        })
        .catch(err => {
            handleServerNetworkError(dispatch, err)
            dispatch(changeTodolistEntityStatusAC(todolistId, 'failed'))
            dispatch(changeTaskEntityStatusAC('failed', todolistId))
        })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === Result_Code.SUCCESS) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(err => {
            handleServerNetworkError(dispatch, err)
        })
}
export const updateTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.updateTodolist(todolistId, title)
        .then(res => {
            if (res.data.resultCode === Result_Code.SUCCESS) {
                dispatch(changeTodolistTitleAC(todolistId, title))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(err => {
            handleServerNetworkError(dispatch, err)
        })
}


//TYPES
export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & { filter: FilterType, entityStatus: RequestStatusType }
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsType = ReturnType<typeof setTodolistsAC>
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsType
    | SetAppStatusActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | ChangeTaskEntityStatus