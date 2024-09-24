import {v1} from "uuid";
import {todolistApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

export let todolistID1 = v1()
export let todolistID2 = v1()

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterType
}

const initialState: TodolistDomainType[] = [
    // {id: todolistID1, title: 'What to learn', filter: 'all'},
    // {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        todolist: TodolistType
    }
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterType
    }
}
export type SetTodolistsType = ReturnType<typeof setTodolistsAC>

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsType

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            return action.payload.todolists.map(tl => ({...tl, filter: "all"}))
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            return [
                {...action.payload.todolist, filter: "all"},
                ...state
            ]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(
                tl => tl.id === action.payload.id
                    ? {...tl, title: action.payload.title}
                    : tl
            )
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(
                tl => tl.id === action.payload.id
                    ? {...tl, filter: action.payload.filter}
                    : tl
            )
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {id: todolistId}
    } as const
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {
        type: "ADD-TODOLIST",
        payload: {todolist}
    } as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {id: todolistId, title}
    } as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterType): ChangeTodolistFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {id: todolistId, filter}
    } as const
}
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {
        type: "SET-TODOLISTS",
        payload: {todolists}
    } as const
}



export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}

export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistApi.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
        })
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistApi.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}

export const updateTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistApi.updateTodolist(todolistId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}
