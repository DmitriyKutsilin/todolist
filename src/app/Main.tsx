// @flow
import * as React from 'react'
import Container from '@mui/material/Container/Container'
import { TodolistsList } from 'features/todolists/ui/TodolistsList/TodolistsList'
import { selectIsLoggedIn } from 'features/auth/model/authSlice'
import { createTodolistTC } from 'features/todolists/model/todolistsSlice'
import { Navigate } from 'react-router-dom'
import { PATH } from 'common/router/router'
import { AddItemForm } from 'common/components'
import { useAppDispatch, useAppSelector } from 'common/hooks'

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
      <div className="MainContainer">
        <TodolistsList />
      </div>
    </Container>
  )
}
