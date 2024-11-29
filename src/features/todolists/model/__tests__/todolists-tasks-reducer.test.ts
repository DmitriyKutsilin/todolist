import { tasksReducer, TasksStateType } from 'features/todolists/model/tasksSlice'
import { addTodolist, TodolistDomain, todolistsReducer } from 'features/todolists/model/todolistsSlice'

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodolistDomain> = []

  const newTodolist = {
    id: 'zdrg43',
    title: 'new todolist',
    addedDate: '',
    order: 0,
  }

  const action = addTodolist({ todolist: newTodolist })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
