import React, { ChangeEvent, memo, useCallback } from 'react'
import Checkbox from '@mui/material/Checkbox/Checkbox'
import IconButton from '@mui/material/IconButton/IconButton'
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded'
import ListItem from '@mui/material/ListItem/ListItem'
import { deleteTaskTC, TaskDomainType, updateTaskTC } from 'features/todolists/model/tasksSlice'
import { TodolistDomain } from 'features/todolists/model/todolistsSlice'
import s from 'features/todolists/ui/TodolistsList/Todolist/Tasks/Task/Task.module.css'
import { EditableSpan } from 'common/components'
import { TaskStatuses } from 'common/enums'
import { useAppDispatch } from 'common/hooks'
import Divider from '@mui/material/Divider/Divider'

type TaskPropsType = {
  task: TaskDomainType
  todolist: TodolistDomain
  // visibility?: 'visible' | 'hidden'
}

export const Task = memo(({ task, todolist }: TaskPropsType) => {
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(deleteTaskTC(todolist.id, task.id))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    dispatch(updateTaskTC(todolist.id, task.id, { status }))
  }

  const changeTaskTitleHandler = (title: string) => {
    // if (title.length === 0) {
    //   dispatch(deleteTaskTC(todolist.id, task.id))
    // } else {
    //   dispatch(updateTaskTC(todolist.id, task.id, { title }))
    // }
    dispatch(updateTaskTC(todolist.id, task.id, { title }))
  }

  return (
    <>
      <ListItem
        sx={{
          // visibility: visibility === 'hidden' ? 'hidden' : 'visible',
          p: 0,
          justifyContent: 'space-between',
          opacity: task.status === TaskStatuses.Completed ? 0.5 : 1,
        }}
      >
        <div className={s.checkboxTitleContainer}>
          <Checkbox
            size="medium"
            checked={task.status === TaskStatuses.Completed}
            onChange={changeTaskStatusHandler}
            disabled={task.entityStatus === 'loading'}
          />
          <EditableSpan
            multiline={true}
            className={s.editableSpan}
            value={task.title}
            onChange={changeTaskTitleHandler}
            disabled={task.entityStatus === 'loading'}
          />
        </div>
        <IconButton
          size="medium"
          color="default"
          onClick={removeTaskHandler}
          disabled={task.entityStatus === 'loading'}
        >
          <RemoveCircleOutlineRoundedIcon fontSize="inherit" />
        </IconButton>
      </ListItem>
    </>
  )
})
