import { setAppStatus } from 'app/appSlice'
import { handleServerAppError, handleServerNetworkError } from 'common/utils/error-utils'
import { AxiosError } from 'axios'
import { clearTodolistsData } from 'features/todolists/model/todolistsSlice'
import { createSlice } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { LoginArgs } from 'features/auth/api/authApi.types'
import { authApi } from 'features/auth/api/authApi'
import { ResultCode } from 'common/enums'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: (create) => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const authReducer = authSlice.reducer
export const { setIsLoggedIn } = authSlice.actions
export const { selectIsLoggedIn } = authSlice.selectors

export const loginTC =
  (data: LoginArgs): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      const res = await authApi.login(data)
      if (res.data.resultCode === ResultCode.SUCCESS) {
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
    const res = await authApi.logout()
    if (res.data.resultCode === ResultCode.SUCCESS) {
      dispatch(setIsLoggedIn({ isLoggedIn: false }))
      dispatch(clearTodolistsData())
      dispatch(setAppStatus({ status: 'succeeded' }))
      localStorage.removeItem('sn-token')
    } else {
      handleServerAppError(dispatch, res.data)
    }
  } catch (e) {
    handleServerNetworkError(dispatch, e as AxiosError)
  }
}
