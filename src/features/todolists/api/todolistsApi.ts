import { AxiosResponse } from 'axios'
import { instance } from 'common/instance'
import { BaseResponse } from 'common/types'
import { Todolist } from './todolistsApi.types'
import { TodolistDomain } from 'features/todolists/model/todolistsSlice'
import { baseApi } from 'app/baseApi'

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodolists: builder.query<TodolistDomain[], void>({
      query: () => 'todo-lists',
      transformResponse: (res: Todolist[]): TodolistDomain[] => {
        return res.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
      },
      providesTags: ['Todolist'],
    }),
    createTodolist: builder.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        method: 'POST',
        url: 'todo-lists',
        body: { title },
      }),
      invalidatesTags: ['Todolist'],
    }),
    deleteTodolist: builder.mutation<BaseResponse, string>({
      query: (id) => ({
        method: 'DELETE',
        url: `todo-lists/${id}`,
      }),
      invalidatesTags: ['Todolist'],
    }),
    updateTodolistTitle: builder.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ id, title }) => ({
        method: 'PUT',
        url: `todo-lists/${id}`,
        body: { title },
      }),
      invalidatesTags: ['Todolist'],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useUpdateTodolistTitleMutation,
} = todolistsApi

export const _todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>('todo-lists')
  },
  createTodolist(title: string) {
    return instance.post<
      BaseResponse<{ item: Todolist }>,
      AxiosResponse<
        BaseResponse<{
          item: Todolist
        }>
      >,
      { title: string }
    >('todo-lists', { title })
  },
  updateTodolist(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponse>(`todo-lists/${id}`, { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`)
  },
}
