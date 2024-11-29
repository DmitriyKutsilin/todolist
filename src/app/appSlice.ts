import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'
import { setIsLoggedIn } from 'features/auth/model/authSlice'
import { authApi } from 'features/auth/api/authApi'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const appSlice = createSlice({
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
  selectors: {
    selectIsInitialized: (state) => state.isInitialized,
    selectAppError: (state) => state.error,
    selectAppStatus: (state) => state.status,
  },
})

export const appReducer = appSlice.reducer
export const { setAppError, setAppStatus, setAppInitialized } = appSlice.actions
export const { selectIsInitialized, selectAppStatus, selectAppError } = appSlice.selectors

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authApi.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    } else {
    }
    dispatch(setAppInitialized({ isInitialized: true }))
  })
}

//types
export type AppInitialState = ReturnType<typeof appSlice.getInitialState>
