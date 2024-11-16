import React, { useCallback, useEffect } from 'react'
import '../app/App.css'
import { AddItemForm } from 'components/AddItemForm/AddItemForm'
import AppBar from '@mui/material/AppBar/AppBar'
import Toolbar from '@mui/material/Toolbar/Toolbar'
import IconButton from '@mui/material/IconButton/IconButton'
import Button from '@mui/material/Button/Button'
import MenuIcon from '@mui/icons-material/Menu'
import Paper from '@mui/material/Paper'
import { createTodolistTC, fetchTodolistsTC, TodolistDomainType } from 'features/TodolistsList/todolistsSlice'
import { useSelector } from 'react-redux'
import { AppRootStateType, useAppDispatch } from 'app/store'
import { TodolistWithRedux } from './TodolistWithRedux'

function AppWithReduxWhole() {
  const todolists = useSelector<AppRootStateType, TodolistDomainType[]>((state) => state.todolists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  //Добавление нового тудулиста
  const addTodolist = useCallback(
    (title: string) => {
      dispatch(createTodolistTC(title))
    },
    [dispatch],
  )

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <div className={'addItemForm'}>
        <AddItemForm addItem={addTodolist} label={'New todolist'} />
      </div>

      <div className={'todolistsFlexbox'}>
        {todolists.map((tl) => {
          return (
            <Paper key={tl.id} elevation={3} className={'paper'}>
              <TodolistWithRedux todolist={tl} />
            </Paper>
          )
        })}
      </div>
    </div>
  )
}

export default AppWithReduxWhole
