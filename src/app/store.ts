import { UnknownAction } from 'redux'
import { tasksReducer, tasksSlice } from 'features/todolists/model/tasksSlice'
import { todolistsReducer, todolistsSlice } from 'features/todolists/model/todolistsSlice'
import { ThunkAction } from 'redux-thunk'
import { appReducer, appSlice } from 'app/appSlice'
import { authReducer, authSlice } from 'features/auth/model/authSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
  },
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>
export type AppDispatch = typeof store.dispatch
