import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '803b80fd-1594-4842-b346-45b4dbcc996e'
    }
})

export const authApi = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId: number, token: string }>, AxiosResponse<ResponseType<{
            userId: number
        }>>, LoginParamsType>('/auth/login', data)
    },
    logout() {
        return instance.delete<ResponseType>('/auth/login')
    },
    me() {
        return instance.get<ResponseType<UserType>>('/auth/me')
    }
}

//API
export const todolistApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('/todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>, AxiosResponse<ResponseType<{
            item: TodolistType
        }>>, { title: string }>('/todo-lists', {title})
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>, {
            title: string
        }>(`/todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, {
            title: string
        }>(`todo-lists/${todolistId}/tasks`, {title});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{
            item: TaskType
        }>>, UpdateTaskModelType>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
}

//TYPES
export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: boolean
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export enum Result_Code {
    SUCCESS = 0,
    ERROR = 1,
    RECAPTCHA_ERROR = 10,
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
type FieldErrorType = {
    error: string
    field: string
}
export type ResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: FieldErrorType[]
    messages: string[]
    data: T
}

type UserType = {
    id: number
    email: string
    login: string
}