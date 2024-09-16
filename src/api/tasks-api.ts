import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {
        'API-KEY': '803b80fd-1594-4842-b346-45b4dbcc996e'
    }
})

type TaskType = {
    id: string,
    title: string,
    description: string,
    todoListId: string,
    order: number,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
    addedDate: string
}

type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}

type FieldErrorType = {
    error: string
    field: string
}

type ResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: FieldErrorType[]
    messages: String[]
    data: T
}

export const tasksApi = {
    getTasks(todolistID: string) {
        return instance.get<GetTasksResponseType>(`/${todolistID}/tasks`)
    },
    createTask(todolistID: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`/${todolistID}/tasks`, {title})
    },
    updateTodolist(todolistId: string, taskID: string, title: string) {
        return instance.put<ResponseType<{item: TaskType}>>(`/${todolistId}/tasks/${taskID}`, {title})
    },
    deleteTodolist(todolistId: string, taskID: string) {
        return instance.delete<ResponseType>(`/${todolistId}/tasks/${taskID}`)
    }
}