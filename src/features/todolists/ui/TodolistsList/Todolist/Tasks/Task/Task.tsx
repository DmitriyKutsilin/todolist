import React, { ChangeEvent, memo } from 'react'
import Checkbox from '@mui/material/Checkbox/Checkbox'
import IconButton from '@mui/material/IconButton/IconButton'
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded'
import ListItem from '@mui/material/ListItem/ListItem'
import { TodolistDomain } from 'features/todolists/model/todolistsSlice'
import s from 'features/todolists/ui/TodolistsList/Todolist/Tasks/Task/Task.module.css'
import { EditableSpan } from 'common/components'
import { TaskStatuses } from 'common/enums'
import { useAppDispatch } from 'common/hooks'
import { TaskDomainType, useDeleteTaskMutation, useUpdateTaskMutation } from 'features/todolists/api/tasksApi'
import { createUpdatedModel } from 'features/todolists/lib/utils/createTaskUpdateModel'

type TaskPropsType = {
  task: TaskDomainType
  todolist: TodolistDomain
  // visibility?: 'visible' | 'hidden'
}

export const Task = memo(({ task, todolist }: TaskPropsType) => {
  const dispatch = useAppDispatch()

  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const removeTaskHandler = () => {
    // dispatch(deleteTaskTC(todolist.id, task.id))
    deleteTask({ todolistId: todolist.id, id: task.id })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    // dispatch(updateTaskTC(todolist.id, task.id, { status }))
    const model = createUpdatedModel(task, { status })
    updateTask({ todolistId: todolist.id, id: task.id, model })
  }

  const changeTaskTitleHandler = (title: string) => {
    // dispatch(updateTaskTC(todolist.id, task.id, { title }))
    const model = createUpdatedModel(task, { title })

    updateTask({ todolistId: todolist.id, id: task.id, model })
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
