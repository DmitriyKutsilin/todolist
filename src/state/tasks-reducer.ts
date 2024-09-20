import {v1} from "uuid";
import {TasksStateType} from "../AppWithRedux";
import {AddTodolistActionType, RemoveTodolistActionType, todolistID1, todolistID2} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";



const initialState: TasksStateType = {
    // [todolistID1]: [
    //     {id: v1(), title: 'HTML&CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'ReactJS', isDone: false},
    // ],
    // [todolistID2]: [
    //     {id: v1(), title: 'Rest API', isDone: true},
    //     {id: v1(), title: 'GraphQL', isDone: false},
    // ],
}

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    payload: {
        todolistId: string
        id: string
    }
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    payload: {
        title: string
        todolistId: string
    }
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    payload: {
        id: string
        status: TaskStatuses
        todolistId: string
    }
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    payload: {
        id: string
        title: string
        todolistId: string
    }
}

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id)
            }
        }
        case "ADD-TASK": {
            const newTask = {
                id: v1(),
                title: action.payload.title,
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: action.payload.todolistId,
                order: 0,
                addedDate: ''
            }
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].
                    map(t => t.id === action.payload.id ? {...t, status: action.payload.status} : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].
                map(t => t.id === action.payload.id ? {...t, title: action.payload.title} : t)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.payload.id]: []
            }
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.payload.id]

            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, id: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", payload: {todolistId, id}}
}
export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
    return {type: "ADD-TASK", payload: {title, todolistId}}
}
export const changeTaskStatusAC = (todolistId: string, id: string, status: TaskStatuses): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", payload: {todolistId, id, status}}
}
export const changeTaskTitleAC = (todolistId: string, id: string, title: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", payload: {todolistId, id, title}}
}

