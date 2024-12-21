// @flow
import * as React from 'react'
import Toolbar from '@mui/material/Toolbar/Toolbar'
import IconButton from '@mui/material/IconButton/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Button from '@mui/material/Button/Button'
import LinearProgress from '@mui/material/LinearProgress/LinearProgress'
import AppBar from '@mui/material/AppBar/AppBar'
import { selectAppStatus, selectIsLoggedIn, selectThemeMode, setIsLoggedIn, setThemeMode } from 'app/appSlice'
import Switch from '@mui/material/Switch/Switch'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { useLogoutMutation } from 'features/auth/api/authApi'
import { ResultCode } from 'common/enums'
import { baseApi } from 'app/baseApi'

export const Header = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const themeMode = useAppSelector(selectThemeMode)

  const [logout] = useLogoutMutation()

  const changeThemeMode = () => {
    dispatch(setThemeMode({ themeMode: themeMode === 'light' ? 'dark' : 'light' }))
  }

  const logoutHandler = () => {
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.SUCCESS) {
          dispatch(setIsLoggedIn({ isLoggedIn: false }))
          localStorage.removeItem('sn-token')
          // dispatch(baseApi.util.resetApiState())
        }
      })
      .then(() => {
        dispatch(baseApi.util.invalidateTags(['Todolist', 'Task']))
      })
    // dispatch(logoutTC())
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler}>
              Logout
            </Button>
          )}
          <Switch color={'primary'} onChange={changeThemeMode} />
        </div>
      </Toolbar>
      {status === 'loading' && <LinearProgress sx={{ position: 'fixed', top: '64px', width: '100%' }} />}
    </AppBar>
  )
}
