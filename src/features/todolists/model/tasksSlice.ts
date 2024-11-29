import { AppThunk } from 'app/store'
import { RequestStatusType, setAppError, setAppStatus } from 'app/appSlice'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import axios, { AxiosError } from 'axios'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addTodolist, clearTodolistsData, removeTodolist } from 'features/todolists/model/todolistsSlice'
import { ResultCode } from 'common/enums'
import { Task, UpdateTaskDomainModel, UpdateTaskModel } from '../api/tasksApi.types'
import { tasksApi } from 'features/todolists/api/tasksApi'

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {
    setTasks: (state, action: PayloadAction<{ todolistId: string; tasks: Task[] }>) => {
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
    addTask: (state, action: PayloadAction<{ task: Task }>) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift({ ...action.payload.task, entityStatus: 'idle' })
    },
    updateTask: (
      state,
      action: PayloadAction<{
        todolistId: string
        id: string
        model: UpdateTaskDomainModel
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
      const tasks = state[action.payload.todolistId]

      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) {
        tasks[index].entityStatus = action.payload.entityStatus
      }
    },
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
        return {}
      })
  },
})

export const tasksReducer = tasksSlice.reducer
export const { setTasks, updateTask, addTask, removeTask, changeTaskEntityStatus } = tasksSlice.actions

//THUNKS
export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    tasksApi
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
    tasksApi
      .deleteTask({ todolistId, id })
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
    tasksApi
      .createTask({ todolistId, title })
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
  (todolistId: string, id: string, domainModel: UpdateTaskDomainModel): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setAppStatus({ status: 'loading' }))

      const task = getState().tasks[todolistId].find((task) => task.id === id)

      if (!task) {
        console.warn('No task found')
        dispatch(setAppStatus({ status: 'failed' }))
        return
      }
      const apiModel: UpdateTaskModel = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...domainModel,
      }

      const res = await tasksApi.updateTask({ todolistId, id, model: apiModel })
      if (res.data.resultCode === ResultCode.SUCCESS) {
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
export type TaskDomainType = Task & { entityStatus: RequestStatusType }
export type TasksStateType = {
  [key: string]: TaskDomainType[]
}
