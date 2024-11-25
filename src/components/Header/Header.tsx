// @flow
import * as React from 'react'
import Toolbar from '@mui/material/Toolbar/Toolbar'
import IconButton from '@mui/material/IconButton/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Button from '@mui/material/Button/Button'
import LinearProgress from '@mui/material/LinearProgress/LinearProgress'
import AppBar from '@mui/material/AppBar/AppBar'
import { logoutTC, selectIsLoggedIn } from 'features/Login/authSlice'
import { selectAppStatus } from 'app/appSlice'
import { useAppDispatch, useAppSelector } from 'app/store'
import Switch from '@mui/material/Switch/Switch'

export const Header = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const logout = () => {
    dispatch(logoutTC())
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          {isLoggedIn && (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
          <Switch color={'default'} />
        </div>
      </Toolbar>
      {status === 'loading' && <LinearProgress />}
    </AppBar>
  )
}
