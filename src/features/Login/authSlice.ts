import { authAPI, LoginParamsType, Result_Code } from 'api/todolist-api'
import { Dispatch } from 'redux'
import { setAppStatus, setAppInitialized } from 'app/appSlice'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { AxiosError } from 'axios'
import { clearTodolistsData } from 'features/TodolistsList/todolistsSlice'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

export const authReducer = authSlice.reducer
export const { setIsLoggedIn } = authSlice.actions

export const loginTC =
  (data: LoginParamsType): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      const res = await authAPI.login(data)
      if (res.data.resultCode === Result_Code.SUCCESS) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    } catch (e) {
      console.log(e)
      //TODO: разобраться с типизацией error при использовании try/catch
      handleServerNetworkError(dispatch, e as AxiosError)
    }
  }

export const logoutTC = (): AppThunk => async (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await authAPI.logout()
    if (res.data.resultCode === Result_Code.SUCCESS) {
      dispatch(setIsLoggedIn({ isLoggedIn: false }))
      dispatch(clearTodolistsData({}))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } else {
      handleServerAppError(dispatch, res.data)
    }
  } catch (e) {
    handleServerNetworkError(dispatch, e as AxiosError)
  }
}
