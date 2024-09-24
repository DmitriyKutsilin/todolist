import {v1} from "uuid";
import {TasksStateType} from "../AppWithRedux";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsType,
    todolistID1,
    todolistID2
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


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
        task: TaskType
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
type SetTasksActionType = ReturnType<typeof setTasksAC>
type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsType
    | SetTasksActionType
    | UpdateTaskActionType

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.payload.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS": {
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks
            }
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id)
            }
        }
        case "ADD-TASK": {
            const newTask = action.payload.task
            return {
                ...state,
                [action.payload.task.todoListId]: [newTask, ...state[action.payload.task.todoListId]]
            }
        }
        case "UPDATE-TASK": {
            return {
                ...state,
                [action.payload.task.todoListId]: state[action.payload.task.todoListId]
                    .map(task => task.id === action.payload.task.id ? {...task, ...action.payload.task} : task)
            }
        }
        // case "CHANGE-TASK-STATUS": {
        //     return {
        //         ...state,
        //         [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.id ? {
        //             ...t,
        //             status: action.payload.status
        //         } : t)
        //     }
        // }
        // case "CHANGE-TASK-TITLE": {
        //     return {
        //         ...state,
        //         [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.id ? {
        //             ...t,
        //             title: action.payload.title
        //         } : t)
        //     }
        // }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.payload.todolist.id]: []
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
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: "ADD-TASK", payload: {task}}
}

export const updateTaskAC = (task: TaskType) => {
    return {type: "UPDATE-TASK", payload: {task}} as const
}
export const changeTaskStatusAC = (todolistId: string, id: string, status: TaskStatuses): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", payload: {todolistId, id, status}}
}
export const changeTaskTitleAC = (todolistId: string, id: string, title: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", payload: {todolistId, id, title}}
}

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: "SET-TASKS", payload: {todolistId, tasks}} as const
}

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistApi.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistApi.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}

export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistApi.createTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}

export type UpdateTaskDomainModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateTaskDomainModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(task => task.id === taskId)

        if (!task) {
            console.warn("No task found")
            return
        }

        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel,
        }

        todolistApi.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC(res.data.data.item))
            })
    }
}

