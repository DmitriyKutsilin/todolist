import React, { useEffect, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress/CircularProgress'
import { selectThemeMode, setIsLoggedIn } from 'app/appSlice'
import { ErrorSnackbar, Header } from 'common/components'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { getTheme } from 'common/theme/theme'
import { useMeQuery } from 'features/auth/api/authApi'
import { ResultCode } from 'common/enums'
// import { setIsLoggedIn } from 'features/auth/model/authSlice'

function App() {
  const dispatch = useAppDispatch()
  // const isInitialized = useAppSelector(selectIsInitialized)
  const [isInitialized, setIsInitialized] = useState(false)
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  const { data, isLoading } = useMeQuery()

  useEffect(() => {
    if (!isLoading) {
      if (data?.resultCode === ResultCode.SUCCESS) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
      setIsInitialized(true)
    }
  }, [isLoading])

  // useEffect(() => {
  //   dispatch(initializeAppTC())
  // }, [])

  //TODO: переделать App.css в module, раскидать стили, изменить центрирование TextField внутри EditableSpan
  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      {/*<div className="App">*/}
      <CssBaseline />
      <Header />
      <Outlet />
      <ErrorSnackbar />
      {/*</div>*/}
    </ThemeProvider>
  )
}

export default App
