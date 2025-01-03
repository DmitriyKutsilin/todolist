import { TaskPriorities, TaskStatuses } from 'common/enums'
import { addTask, removeTask, tasksReducer, TasksStateType, updateTask } from 'features/todolists/model/tasksSlice'
import { addTodolist, removeTodolist } from 'features/todolists/model/todolistsSlice'

let startState: TasksStateType

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: '',
        entityStatus: 'idle',
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: '',
        entityStatus: 'idle',
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: '',
        entityStatus: 'idle',
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: '',
        entityStatus: 'idle',
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: '',
        entityStatus: 'idle',
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: '',
        entityStatus: 'idle',
      },
    ],
  }
})

test('correct task should be deleted from correct array', () => {
  const action = removeTask({ todolistId: 'todolistId2', id: '2' })

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'][1].id).toBe('2')
  expect(endState['todolistId2'][1].id).toBe('3')
})

test('correct task should be added to correct array', () => {
  const action = addTask({
    task: {
      id: '123',
      title: 'juice',
      status: TaskStatuses.New,
      description: '',
      priority: TaskPriorities.Low,
      startDate: '',
      deadline: '',
      todoListId: 'todolistId2',
      order: 0,
      addedDate: '',
    },
  })

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('juice')
  expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
  const model = { status: TaskStatuses.New }

  const action = updateTask({ todolistId: 'todolistId2', id: '2', model })

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
  expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {
  const model = { title: 'new title' }

  const action = updateTask({ todolistId: 'todolistId2', id: '2', model })

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'][1].title).toBe('JS')
  expect(endState['todolistId2'][1].title).toBe('new title')
})

test('new array should be added when new todolist is added', () => {
  const newTodolist = {
    id: 'zdrg43',
    title: 'new todolist',
    addedDate: '',
    order: 0,
  }

  const action = addTodolist({ todolist: newTodolist })

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k != 'todolistId1' && k != 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
  const action = removeTodolist({ id: 'todolistId2' })

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})
