import axios, { AxiosResponse } from 'axios'
import { BaseResponse } from 'common/types'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'API-KEY': process.env.REACT_APP_API_KEY,
  },
})

instance.interceptors.request.use(function (config) {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('sn-token')}`
  return config
})

//API
export const todolistAPI = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<
      BaseResponse<{ item: TaskType }>,
      AxiosResponse<BaseResponse<{ item: TaskType }>>,
      {
        title: string
      }
    >(`todo-lists/${todolistId}/tasks`, { title })
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<
      BaseResponse<{ item: TaskType }>,
      AxiosResponse<
        BaseResponse<{
          item: TaskType
        }>
      >,
      UpdateTaskModelType
    >(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}

//TYPES

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export enum Result_Code {
  SUCCESS = 0,
  ERROR = 1,
  RECAPTCHA_ERROR = 10,
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
