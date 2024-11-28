// @flow
import * as React from 'react'
import Container from '@mui/material/Container/Container'
import { AddItemForm } from 'common/components/AddItemForm/AddItemForm'
import { TodolistsList } from 'features/todolists/ui/TodolistsList/TodolistsList'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectIsLoggedIn } from 'features/Login/authSlice'
import { createTodolistTC } from 'features/todolists/model/todolistsSlice'
import { Navigate } from 'react-router-dom'
import { PATH } from 'routes/router'
import Grid from '@mui/material/Grid/Grid'

export const Main = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const addTodolist = (title: string) => {
    dispatch(createTodolistTC(title))
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <Container fixed>
      <div className={'addItemForm'}>
        <AddItemForm addItem={addTodolist} label={'New todolist'} />
      </div>
      <Grid container spacing={4}>
        <TodolistsList />
      </Grid>
    </Container>
  )
}
