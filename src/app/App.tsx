import React, { useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress/CircularProgress'
import { initializeAppTC, selectIsInitialized, selectThemeMode } from 'app/appSlice'
import { ErrorSnackbar, Header } from 'common/components'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { getTheme } from 'common/theme/theme'

function App() {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(selectIsInitialized)
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  //TODO: переделать App.css в module, раскидать стили, изменить центрирование TextField внутри EditableSpan
  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
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
