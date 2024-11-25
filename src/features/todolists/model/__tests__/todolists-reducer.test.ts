import { v1 } from 'uuid'
import {
  addTodolist,
  changeTodolistFilter,
  changeTodolistTitle,
  FilterType,
  removeTodolist,
  TodolistDomainType,
  todolistsReducer,
} from 'features/todolists/model/todolistsSlice'

let todolistId1: string
let todolistId2: string
let startState: TodolistDomainType[]

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = [
    { id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle' },
    { id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle' },
  ]
})

test('correct todolist should be removed', () => {
  // 2. Действие
  const action = removeTodolist({ id: todolistId1 })

  const endState = todolistsReducer(startState, action)

  // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
  // в массиве останется один тудулист
  expect(endState.length).toBe(1)
  // удалится нужный тудулист, а не любой
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
  const newTodolist = {
    id: 'zdrg43',
    title: 'new todolist',
    addedDate: '',
    order: 0,
  }
  const action = addTodolist({ todolist: newTodolist })

  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(action.payload.todolist.title)
})

test('correct todolist should change its name', () => {
  const newTitle = 'New title'
  const action = changeTodolistTitle({ id: todolistId2, title: newTitle })

  const endState = todolistsReducer(startState, action)

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(action.payload.title)
})

test('correct filter of todolist should be changed', () => {
  const filterValue: FilterType = 'completed'
  const action = changeTodolistFilter({ id: todolistId2, filter: filterValue })

  const endState = todolistsReducer(startState, action)

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(action.payload.filter)
})
