import {v1} from "uuid";
import {FilterType, TodolistType} from "../AppWithRedux";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

let todolistId1: string
let todolistId2: string
let startState: TodolistType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
})


test('correct todolist should be removed', () => {
    // 2. Действие
    const action = removeTodolistAC(todolistId1)

    const endState = todolistsReducer(startState, action)

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const newTitle = 'New todolist'
    const action = addTodolistAC(newTitle)

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(action.payload.title)
})

test('correct todolist should change its name', () => {
    const newTitle = 'New title'
    const action = changeTodolistTitleAC(todolistId2, newTitle)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(action.payload.title)
})

test('correct filter of todolist should be changed', () => {
    const filterValue: FilterType = "completed"
    const action = changeTodolistFilterAC(todolistId2, filterValue)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(action.payload.filter)
})