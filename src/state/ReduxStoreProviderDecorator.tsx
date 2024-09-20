import {Provider} from "react-redux";
import {AppRootStateType, store} from "./store";
import {ReactNode} from "react";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
    ],
    tasks: {
        ["todolistId1"]: [
            {id: v1(),
                title: 'HTML',
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''},
            {id: v1(),
                title: 'JS',
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''},
        ],
        ["todolistId2"]: [
            {id: v1(),
                title: 'Milk',
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "todolistId2",
                order: 0,
                addedDate: ''},
            {id: v1(),
                title: 'Sugar',
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "todolistId2",
                order: 0,
                addedDate: ''},
        ],
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as any)

export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}