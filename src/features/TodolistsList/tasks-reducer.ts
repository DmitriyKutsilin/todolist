import {
  AddTodolistActionType,
  ClearTodolistsDataActionType,
  RemoveTodolistActionType,
  SetTodolistsType,
} from './todolists-reducer'
import { Result_Code, TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType } from 'api/todolist-api'
import { Dispatch } from 'redux'
import { AppRootStateType } from 'app/store'
import {
  RequestStatusType,
  setAppErrorAC,
  SetAppErrorActionType,
  setAppStatusAC,
  SetAppStatusActionType,
} from 'app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import axios, { AxiosError } from 'axios'

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'SET-TASKS':
      return {
        ...state,
        [action.payload.todolistId]: action.payload.tasks.map((tl) => ({ ...tl, entityStatus: 'idle' })),
      }
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.id),
      }
    case 'ADD-TASK':
      return {
        ...state,
        [action.payload.task.todoListId]: [
          { ...action.payload.task, entityStatus: 'idle' },
          ...state[action.payload.task.todoListId],
        ],
      }
    case 'UPDATE-TASK':
      return {
        ...state,
        [action.payload.task.todoListId]: state[action.payload.task.todoListId].map((task) =>
          task.id === action.payload.task.id ? { ...task, ...action.payload.task } : task,
        ),
      }
    case 'CHANGE-TASK-ENTITY-STATUS':
      return action.payload.taskId
        ? {
            ...state,
            [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
              t.id === action.payload.taskId
                ? {
                    ...t,
                    entityStatus: action.payload.entityStatus,
                  }
                : t,
            ),
          }
        : {
            ...state,
            [action.payload.todolistId]: state[action.payload.todolistId].map((t) => ({
              ...t,
              entityStatus: action.payload.entityStatus,
            })),
          }
    case 'SET-TODOLISTS': {
      const stateCopy = { ...state }
      action.payload.todolists.forEach((tl) => {
        stateCopy[tl.id] = []
      })
      return stateCopy
    }
    case 'ADD-TODOLIST':
      return { ...state, [action.payload.todolist.id]: [] }
    case 'REMOVE-TODOLIST': {
      const stateCopy = { ...state }
      delete stateCopy[action.payload.id]
      return stateCopy
    }
    case 'CLEAR-TODOLISTS-DATA':
      return {}
    default:
      return state
  }
}

//ACTION CREATORS
export const removeTaskAC = (todolistId: string, id: string) =>
  ({ type: 'REMOVE-TASK', payload: { todolistId, id } }) as const
export const addTaskAC = (task: TaskType) => ({ type: 'ADD-TASK', payload: { task } }) as const
export const updateTaskAC = (task: TaskType) => ({ type: 'UPDATE-TASK', payload: { task } }) as const
export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
  ({ type: 'SET-TASKS', payload: { todolistId, tasks } }) as const
export const changeTaskEntityStatusAC = (entityStatus: RequestStatusType, todolistId: string, taskId?: string) =>
  ({ type: 'CHANGE-TASK-ENTITY-STATUS', payload: { todolistId, taskId, entityStatus } }) as const
// export const changeTaskStatusAC = (todolistId: string, id: string, status: TaskStatuses) =>
//     ({type: "CHANGE-TASK-STATUS", payload: {todolistId, id, status}} as const)
// export const changeTaskTitleAC = (todolistId: string, id: string, title: string) =>
//     ({type: "CHANGE-TASK-TITLE", payload: {todolistId, id, title}} as const)

//THUNKS
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  todolistApi
    .getTasks(todolistId)
    .then((res) => {
      if (!res.data.error) {
        dispatch(setTasksAC(todolistId, res.data.items))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        dispatch(setAppErrorAC(res.data.error))
        dispatch(setAppStatusAC('failed'))
      }
    })
    .catch((err) => {
      handleServerNetworkError(dispatch, err)
    })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(changeTaskEntityStatusAC('loading', todolistId, taskId))
  todolistApi
    .deleteTask(todolistId, taskId)
    .then((res) => {
      dispatch(removeTaskAC(todolistId, taskId))
      dispatch(setAppStatusAC('succeeded'))
    })
    .catch((err) => {
      handleServerNetworkError(dispatch, err)
      dispatch(changeTaskEntityStatusAC('failed', todolistId, taskId))
    })
}
export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todolistApi
    .createTask(todolistId, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(addTaskAC(res.data.data.item))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((error: AxiosError) => {
      handleServerNetworkError(dispatch, error)
    })
}
export const updateTaskTC =
  (todolistId: string, taskId: string, domainModel: UpdateTaskDomainModelType) =>
  async (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
    try {
      dispatch(setAppStatusAC('loading'))

      const task = getState().tasks[todolistId].find((task) => task.id === taskId)

      if (!task) {
        console.warn('No task found')
        dispatch(setAppStatusAC('failed'))
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

      const res = await todolistApi.updateTask(todolistId, taskId, apiModel)
      if (res.data.resultCode === Result_Code.SUCCESS) {
        dispatch(updateTaskAC(res.data.data.item))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleServerNetworkError(dispatch, err)
      }
    }
    // todolistApi.updateTask(todolistId, taskId, apiModel)
    //     .then(res => {
    //         if (res.data.resultCode === 0) {
    //             dispatch(updateTaskAC(res.data.data.item))
    //             dispatch(setAppStatusAC('succeeded'))
    //         } else {
    //             handleServerAppError(dispatch, res.data)
    //         }
    //     })
    //     .catch(error => {
    //         handleServerNetworkError(dispatch, error)
    //     })
  }

//TYPES
export type TaskDomainType = TaskType & { entityStatus: RequestStatusType }
export type TasksStateType = {
  [key: string]: TaskDomainType[]
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
export type ChangeTaskEntityStatus = ReturnType<typeof changeTaskEntityStatusAC>
type ActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof updateTaskAC>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsType
  | SetAppStatusActionType
  | SetAppErrorActionType
  | ChangeTaskEntityStatus
  | ClearTodolistsDataActionType
