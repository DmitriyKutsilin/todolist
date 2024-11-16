import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'
import { authAPI } from 'api/todolist-api'
import { setIsLoggedIn } from 'features/Login/authSlice'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    isInitialized: false,
    status: 'idle' as RequestStatusType,
    error: null as string | null,
  },
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const appReducer = appSlice.reducer
export const { setAppError, setAppStatus, setAppInitialized } = appSlice.actions

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    } else {
    }
    dispatch(setAppInitialized({ isInitialized: true }))
  })
}

//types
export type AppInitialState = ReturnType<typeof appSlice.getInitialState>