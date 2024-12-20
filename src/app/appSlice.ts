import { createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'
import { _authApi } from 'features/auth/api/authApi'
import { handleServerAppError, handleServerNetworkError } from 'common/utils/error-utils'

export type ThemeMode = 'dark' | 'light'
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    // isInitialized: false,
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    themeMode: 'light' as ThemeMode,
    isLoggedIn: false,
  },
  reducers: (create) => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setAppStatus: create.reducer<{ status: RequestStatusType }>((state, action) => {
      state.status = action.payload.status
    }),
    // setAppInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
    //   state.isInitialized = action.payload.isInitialized
    // }),
    setThemeMode: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
  }),
  selectors: {
    // selectIsInitialized: (state) => state.isInitialized,
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectAppError: (state) => state.error,
    selectAppStatus: (state) => state.status,
    selectThemeMode: (state) => state.themeMode,
  },
})

export const appReducer = appSlice.reducer
export const { setAppError, setAppStatus, setThemeMode, setIsLoggedIn } = appSlice.actions
export const { selectAppStatus, selectAppError, selectThemeMode, selectIsLoggedIn } = appSlice.selectors

// export const initializeAppTC = () => (dispatch: Dispatch) => {
//   dispatch(setAppStatus({ status: 'loading' }))
//   _authApi
//     .me()
//     .then((res) => {
//       if (res.data.resultCode === 0) {
//         dispatch(setIsLoggedIn({ isLoggedIn: true }))
//         dispatch(setAppStatus({ status: 'succeeded' }))
//       } else {
//         handleServerAppError(dispatch, res.data)
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(dispatch, error)
//     })
//     .finally(() => {
//       dispatch(setAppInitialized({ isInitialized: true }))
//     })
// }

//types
export type AppInitialState = ReturnType<typeof appSlice.getInitialState>
