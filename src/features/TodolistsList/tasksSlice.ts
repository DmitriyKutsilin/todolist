import { Result_Code, TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType } from 'api/todolist-api'
import { AppThunk } from 'app/store'
import { RequestStatusType, setAppError, setAppStatus } from 'app/appSlice'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import axios, { AxiosError } from 'axios'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addTodolist, clearTodolistsData, removeTodolist, setTodolists } from 'features/TodolistsList/todolistsSlice'

const initialState: TasksStateType = {}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {
    setTasks: (state, action: PayloadAction<{ todolistId: string; tasks: TaskType[] }>) => {
      const domainTasks: TaskDomainType[] = action.payload.tasks.map((t) => ({ ...t, entityStatus: 'idle' }))
      state[action.payload.todolistId] = domainTasks
    },
    removeTask: (state, action: PayloadAction<{ todolistId: string; id: string }>) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.id)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift({ ...action.payload.task, entityStatus: 'idle' })
    },
    updateTask: (
      state,
      action: PayloadAction<{
        todolistId: string
        id: string
        model: UpdateTaskDomainModelType
      }>,
    ) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.id)
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model }
      }
    },
    changeTaskEntityStatus: (
      state,
      action: PayloadAction<{
        entityStatus: RequestStatusType
        todolistId: string
        taskId: string
      }>,
    ) => {
      //TODO: посмотреть работу entityStatus отдельно и совместно при удалении тудулиста, может оставить один вариант
      const tasks = state[action.payload.todolistId]

      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) {
        tasks[index].entityStatus = action.payload.entityStatus
      }
    },
    // changeTaskEntityStatus: (
    //   state,
    //   action: PayloadAction<{
    //     entityStatus: RequestStatusType
    //     todolistId: string
    //     taskId?: string
    //   }>,
    // ) => {
    //   //TODO: посмотреть работу entityStatus отдельно и совместно при удалении тудулиста, может оставить один вариант
    //   const tasks = state[action.payload.todolistId]
    //
    //   if (action.payload.taskId) {
    //     const index = tasks.findIndex((t) => t.id === action.payload.taskId)
    //     if (index !== -1) {
    //       tasks[index].entityStatus = action.payload.entityStatus
    //     }
    //   } else {
    //     tasks.forEach((t) => (t.entityStatus = action.payload.entityStatus))
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      // .addCase(setTodolists, (state, action) => {
      //   action.payload.todolists.forEach((tl: any) => {
      //     state[tl.id] = []
      //   })
      // })
      .addCase(clearTodolistsData, (state, action) => {
        // state = tasksSlice.getInitialState()
        // state = {} as TasksStateType
        return {}
      })
  },
})

export const tasksReducer = tasksSlice.reducer
export const { setTasks, updateTask, addTask, removeTask, changeTaskEntityStatus } = tasksSlice.actions

export const _tasksReducer = (state: TasksStateType = initialState, action: any): TasksStateType => {
  switch (action.type) {
    case 'SET-TASKS':
      return {
        ...state,
        [action.payload.todolistId]: action.payload.tasks.map((tl: any) => ({ ...tl, entityStatus: 'idle' })),
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
      action.payload.todolists.forEach((tl: any) => {
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
// export const addTaskAC = (task: TaskType) => ({ type: 'ADD-TASK', payload: { task } }) as const
// export const updateTaskAC = (task: TaskType) => ({ type: 'UPDATE-TASK', payload: { task } }) as const
// export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
//   ({ type: 'SET-TASKS', payload: { todolistId, tasks } }) as const
// export const changeTaskEntityStatusAC = (entityStatus: RequestStatusType, todolistId: string, taskId?: string) =>
//   ({ type: 'CHANGE-TASK-ENTITY-STATUS', payload: { todolistId, taskId, entityStatus } }) as const

//THUNKS
export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    todolistAPI
      .getTasks(todolistId)
      .then((res) => {
        if (!res.data.error) {
          dispatch(setTasks({ todolistId, tasks: res.data.items }))
          dispatch(setAppStatus({ status: 'succeeded' }))
        } else {
          dispatch(setAppError({ error: res.data.error }))
          dispatch(setAppStatus({ status: 'failed' }))
        }
      })
      .catch((err) => {
        handleServerNetworkError(dispatch, err)
      })
  }
export const deleteTaskTC =
  (todolistId: string, id: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    dispatch(changeTaskEntityStatus({ entityStatus: 'loading', todolistId, taskId: id }))
    todolistAPI
      .deleteTask(todolistId, id)
      .then((res) => {
        dispatch(removeTask({ todolistId, id }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      })
      .catch((err) => {
        handleServerNetworkError(dispatch, err)
        dispatch(changeTaskEntityStatus({ entityStatus: 'failed', todolistId, taskId: id }))
      })
  }
export const createTaskTC =
  (todolistId: string, title: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    todolistAPI
      .createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(addTask({ task: res.data.data.item }))
          dispatch(setAppStatus({ status: 'succeeded' }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((error: AxiosError) => {
        handleServerNetworkError(dispatch, error)
      })
  }
export const updateTaskTC =
  (todolistId: string, id: string, domainModel: UpdateTaskDomainModelType): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setAppStatus({ status: 'loading' }))

      const task = getState().tasks[todolistId].find((task) => task.id === id)

      if (!task) {
        console.warn('No task found')
        dispatch(setAppStatus({ status: 'failed' }))
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

      const res = await todolistAPI.updateTask(todolistId, id, apiModel)
      if (res.data.resultCode === Result_Code.SUCCESS) {
        dispatch(updateTask({ todolistId, id, model: apiModel }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleServerNetworkError(dispatch, err)
      }
    }
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
