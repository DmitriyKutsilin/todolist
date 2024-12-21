import { BaseResponse } from 'common/types'
import { instance } from 'common/instance'
import { GetTasksResponse, Task, UpdateTaskModel } from './tasksApi.types'
import { baseApi } from 'app/baseApi'
import { RequestStatusType } from 'app/appSlice'

//type
export type TaskDomainType = Task & { entityStatus: RequestStatusType }

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse<TaskDomainType[]>, string>({
      query: (todolistId) => `todo-lists/${todolistId}/tasks`,
      transformResponse: (res: GetTasksResponse): GetTasksResponse<TaskDomainType[]> => {
        return { ...res, items: res.items.map((task) => ({ ...task, entityStatus: 'idle' })) }
      },
      providesTags: ['Task'],
    }),
    createTask: build.mutation<BaseResponse<{ item: Task }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        method: 'POST',
        url: `todo-lists/${todolistId}/tasks`,
        body: { title },
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: build.mutation<BaseResponse, { todolistId: string; id: string }>({
      query: ({ todolistId, id }) => ({
        method: 'DELETE',
        url: `todo-lists/${todolistId}/tasks/${id}`,
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: build.mutation<
      BaseResponse<{ item: Task }>,
      {
        todolistId: string
        id: string
        model: UpdateTaskModel
      }
    >({
      query: ({ todolistId, id, model }) => ({
        method: 'PUT',
        url: `todo-lists/${todolistId}/tasks/${id}`,
        body: model,
      }),
      invalidatesTags: ['Task'],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi

export const _tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  deleteTask(payload: { todolistId: string; id: string }) {
    const { todolistId, id } = payload
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${id}`)
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload
    return instance.post<BaseResponse<{ item: Task }>>(`todo-lists/${todolistId}/tasks`, { title })
  },
  updateTask(payload: { todolistId: string; id: string; model: UpdateTaskModel }) {
    const { todolistId, id, model } = payload
    return instance.put<BaseResponse<{ item: Task }>>(`todo-lists/${todolistId}/tasks/${id}`, model)
  },
}
