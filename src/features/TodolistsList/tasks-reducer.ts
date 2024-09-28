import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsType,
    todolistID1,
    todolistID2
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";

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

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS":
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }
        case "UPDATE-TASK":
            return {
                ...state,
                [action.payload.task.todoListId]: state[action.payload.task.todoListId]
                    .map(task => task.id === action.payload.task.id ? {...task, ...action.payload.task} : task)
            }
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.payload.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "ADD-TODOLIST":
            return {...state, [action.payload.todolist.id]: []}
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return stateCopy
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
        default:
            return state
    }
}

//ACTION CREATORS
export const removeTaskAC = (todolistId: string, id: string) =>
    ({type: "REMOVE-TASK", payload: {todolistId, id}} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: "ADD-TASK", payload: {task}} as const)
export const updateTaskAC = (task: TaskType) =>
    ({type: "UPDATE-TASK", payload: {task}} as const)
export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
    ({type: "SET-TASKS", payload: {todolistId, tasks}} as const)
// export const changeTaskStatusAC = (todolistId: string, id: string, status: TaskStatuses) =>
//     ({type: "CHANGE-TASK-STATUS", payload: {todolistId, id, status}} as const)
// export const changeTaskTitleAC = (todolistId: string, id: string, title: string) =>
//     ({type: "CHANGE-TASK-TITLE", payload: {todolistId, id, title}} as const)


//THUNKS
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistApi.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistApi.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}
export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistApi.createTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateTaskDomainModelType) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
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

//TYPES
export type TasksStateType = {
    [key: string]: TaskType[]
}

export type UpdateTaskDomainModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

// type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
// type AddTaskActionType = ReturnType<typeof addTaskAC>
// type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
// type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
// type SetTasksActionType = ReturnType<typeof setTasksAC>
// type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsType
