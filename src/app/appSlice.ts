import { createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'
import { setIsLoggedIn } from 'features/auth/model/authSlice'
import { authApi } from 'features/auth/api/authApi'

export type ThemeMode = 'dark' | 'light'
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isInitialized: false,
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    themeMode: 'light' as ThemeMode,
  },
  reducers: (create) => ({
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setAppStatus: create.reducer<{ status: RequestStatusType }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
      state.isInitialized = action.payload.isInitialized
    }),
    setThemeMode: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
  }),
  selectors: {
    selectIsInitialized: (state) => state.isInitialized,
    selectAppError: (state) => state.error,
    selectAppStatus: (state) => state.status,
    selectThemeMode: (state) => state.themeMode,
  },
})

export const appReducer = appSlice.reducer
export const { setAppError, setAppStatus, setAppInitialized, setThemeMode } = appSlice.actions
export const { selectIsInitialized, selectAppStatus, selectAppError, selectThemeMode } = appSlice.selectors

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
