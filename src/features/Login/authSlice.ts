import { authAPI, Result_Code } from 'api/todolist-api'
import { setAppStatus } from 'app/appSlice'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { AxiosError } from 'axios'
import { clearTodolistsData } from 'features/todolists/model/todolistsSlice'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { LoginParamsType } from 'features/Login/Login'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const authReducer = authSlice.reducer
export const { setIsLoggedIn } = authSlice.actions
export const { selectIsLoggedIn } = authSlice.selectors

export const loginTC =
  (data: LoginParamsType): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      const res = await authAPI.login(data)
      if (res.data.resultCode === Result_Code.SUCCESS) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        dispatch(setAppStatus({ status: 'succeeded' }))
        localStorage.setItem('sn-token', res.data.data.token)
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
      localStorage.removeItem('sn-token')
    } else {
      handleServerAppError(dispatch, res.data)
    }
  } catch (e) {
    handleServerNetworkError(dispatch, e as AxiosError)
  }
}
