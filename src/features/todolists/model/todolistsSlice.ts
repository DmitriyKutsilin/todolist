import { RequestStatusType, setAppStatus } from 'app/appSlice'
import { handleServerAppError, handleServerNetworkError } from 'common/utils/error-utils'
import { changeTaskEntityStatus, fetchTasksTC } from 'features/todolists/model/tasksSlice'
import { AppThunk } from 'app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { todolistsApi } from '../api/todolistsApi'
import { Todolist } from '../api/todolistsApi.types'
import { ResultCode } from 'common/enums'

export const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: [] as TodolistDomain[],
  reducers: {
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      // debugger
      // const a = current(state)
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    addTodolist: (state, action: PayloadAction<{ todolist: Todolist }>) => {
      state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
    },
    changeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    },
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterType }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].entityStatus = action.payload.entityStatus
      }
    },
    setTodolists: (state, action: PayloadAction<{ todolists: Todolist[] }>) => {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
      //2 var
      // action.payload.todolists.forEach((tl) => {
      //   state.push({ ...tl, filter: "all", entityStatus: "idle" });
      // });
    },
    clearTodolistsData: (state, action) => {
      return []
    },
  },
  selectors: {
    selectTodolists: (state) => state,
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const { selectTodolists } = todolistsSlice.selectors
export const {
  removeTodolist,
  addTodolist,
  changeTodolistTitle,
  changeTodolistFilter,
  changeTodolistEntityStatus,
  setTodolists,
  clearTodolistsData,
} = todolistsSlice.actions

//THUNKS
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(setTodolists({ todolists: res.data }))
      dispatch(setAppStatus({ status: 'succeeded' }))
      return res.data
    })
    .then((todos) => {
      todos.forEach((tl) => {
        dispatch(fetchTasksTC(tl.id))
      })
    })
    .catch((err) => {
      handleServerNetworkError(dispatch, err)
    })
}
export const deleteTodolistTC =
  (id: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(changeTodolistEntityStatus({ id, entityStatus: 'loading' }))

    const tasks = getState().tasks[id]

    tasks.forEach((t) => dispatch(changeTaskEntityStatus({ entityStatus: 'loading', todolistId: id, taskId: t.id })))

    todolistsApi
      .deleteTodolist(id)
      .then((res) => {
        dispatch(removeTodolist({ id }))
      })
      .catch((err) => {
        handleServerNetworkError(dispatch, err)
        dispatch(changeTodolistEntityStatus({ id, entityStatus: 'failed' }))
        tasks.forEach((t) =>
          dispatch(
            changeTaskEntityStatus({
              entityStatus: 'failed',
              todolistId: id,
              taskId: t.id,
            }),
          ),
        )
      })
  }
export const createTodolistTC =
  (title: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    todolistsApi
      .createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.SUCCESS) {
          dispatch(addTodolist({ todolist: res.data.data.item }))
          dispatch(setAppStatus({ status: 'succeeded' }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((err) => {
        handleServerNetworkError(dispatch, err)
      })
  }
export const updateTodolistTC =
  (id: string, title: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    todolistsApi
      .updateTodolist({ title, id })
      .then((res) => {
        if (res.data.resultCode === ResultCode.SUCCESS) {
          dispatch(changeTodolistTitle({ id, title }))
          dispatch(setAppStatus({ status: 'succeeded' }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((err) => {
        handleServerNetworkError(dispatch, err)
      })
  }

//TYPES
export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomain = Todolist & { filter: FilterType; entityStatus: RequestStatusType }
