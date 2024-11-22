import { Result_Code, todolistAPI, TodolistType } from 'api/todolist-api'
import { RequestStatusType, setAppStatus } from 'app/appSlice'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { changeTaskEntityStatus, fetchTasksTC } from 'features/TodolistsList/tasksSlice'
import { AppThunk } from 'app/store'
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'

const initialState: TodolistDomainType[] = []

export const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: [] as TodolistDomainType[],
  reducers: {
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      // debugger
      // const a = current(state)
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
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
    setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
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
})

export const todolistsReducer = todolistsSlice.reducer
export const {
  removeTodolist,
  addTodolist,
  changeTodolistTitle,
  changeTodolistFilter,
  changeTodolistEntityStatus,
  setTodolists,
  clearTodolistsData,
} = todolistsSlice.actions

//ACTION CREATORS
// export const removeTodolistAC = (id: string) => ({ type: 'REMOVE-TODOLIST', payload: { id } }) as const
// export const addTodolistAC = (todolist: TodolistType) => ({ type: 'ADD-TODOLIST', payload: { todolist } }) as const
// export const changeTodolistTitleAC = (id: string, title: string) =>
//   ({ type: 'CHANGE-TODOLIST-TITLE', payload: { id, title } }) as const
// export const changeTodolistFilterAC = (id: string, filter: FilterType) =>
//   ({ type: 'CHANGE-TODOLIST-FILTER', payload: { id, filter } }) as const
// export const setTodolistsAC = (todolists: TodolistType[]) =>
//   ({ type: 'SET-TODOLISTS', payload: { todolists } }) as const
// export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) =>
//   ({ type: 'CHANGE-TODOLIST-ENTITY-STATUS', payload: { id, entityStatus } }) as const
// export const clearTodolistsDataAC = () => ({ type: 'CLEAR-TODOLISTS-DATA' }) as const

//THUNKS
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  todolistAPI
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
    console.log(tasks)
    tasks.forEach((t) => dispatch(changeTaskEntityStatus({ entityStatus: 'loading', todolistId: id, taskId: t.id })))
    // dispatch(changeTaskEntityStatus({ entityStatus: 'loading', todolistId: id }))
    todolistAPI
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
              entityStatus: 'loading',
              todolistId: id,
              taskId: t.id,
            }),
          ),
        )
        // dispatch(changeTaskEntityStatus({ entityStatus: 'failed', todolistId: id }))
      })
  }
export const createTodolistTC =
  (title: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    todolistAPI
      .createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === Result_Code.SUCCESS) {
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
    todolistAPI
      .updateTodolist(id, title)
      .then((res) => {
        if (res.data.resultCode === Result_Code.SUCCESS) {
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
export type TodolistDomainType = TodolistType & { filter: FilterType; entityStatus: RequestStatusType }
// export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
// export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
// export type SetTodolistsType = ReturnType<typeof setTodolistsAC>
// export type ClearTodolistsDataActionType = ReturnType<typeof clearTodolistsDataAC>
