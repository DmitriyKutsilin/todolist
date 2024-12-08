// @flow
import * as React from 'react'
import { useMemo } from 'react'
import { TodolistDomain } from 'features/todolists/model/todolistsSlice'
import { selectTasks } from 'features/todolists/model/tasksSlice'
import { Task } from 'features/todolists/ui/TodolistsList/Todolist/Tasks/Task/Task'
import List from '@mui/material/List/List'
import { TaskStatuses } from 'common/enums'
import { useAppSelector } from 'common/hooks'

type Props = {
  todolist: TodolistDomain
}
export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)

  // const dispatch = useAppDispatch()

  // useEffect(() => {
  //   dispatch(fetchTasksTC(todolist.id))
  // }, [])

  let todolistTasks = tasks[todolist.id]

  todolistTasks = useMemo(() => {
    if (todolist.filter === 'active') {
      todolistTasks = todolistTasks.filter((t) => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
      todolistTasks = todolistTasks.filter((t) => t.status === TaskStatuses.Completed)
    }
    return todolistTasks
  }, [todolistTasks, todolist.filter])

  return (
    <List>
      {todolistTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        todolistTasks?.map((task) => {
          return <Task key={task.id} task={task} todolist={todolist} />
        })
      )}
    </List>
  )
}
