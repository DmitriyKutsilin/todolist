import React, { useEffect } from 'react'
import './App.css'
import { useAppDispatch, useAppSelector } from './store'
import { ErrorSnackbar } from 'common/components/ErrorSnackbar/ErrorSnackbar'
import { Outlet } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress/CircularProgress'
import { initializeAppTC } from 'app/appSlice'
import { Header } from 'common/components/Header/Header'

//TODO: позиционирование прогрессбара
function App() {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)

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
