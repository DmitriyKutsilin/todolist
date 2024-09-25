import {v1} from "uuid";
import {todolistApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

export let todolistID1 = v1()
export let todolistID2 = v1()

const initialState: TodolistDomainType[] = [
    // {id: todolistID1, title: 'What to learn', filter: 'all'},
    // {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.payload.todolists.map(tl => ({...tl, filter: "all"}))
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.id)
        case 'ADD-TODOLIST':
            return [{...action.payload.todolist, filter: "all"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
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


//THUNKS
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => {
    todolistApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistApi.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
        })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistApi.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const updateTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistApi.updateTodolist(todolistId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}


//TYPES
export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & { filter: FilterType }
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsType = ReturnType<typeof setTodolistsAC>
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsType