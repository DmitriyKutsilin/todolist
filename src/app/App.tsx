import React, { useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress/CircularProgress'
import { initializeAppTC, selectIsInitialized } from 'app/appSlice'
import { ErrorSnackbar, Header } from 'common/components'
import { useAppDispatch, useAppSelector } from 'common/hooks'

//TODO: позиционирование прогрессбара
function App() {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(selectIsInitialized)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="App">
      <Header />
      <Outlet />
      <ErrorSnackbar />
    </div>
  )
}

export default App
