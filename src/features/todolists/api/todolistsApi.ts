import { AxiosResponse } from 'axios'
import { instance } from 'common/instance'
import { BaseResponse } from 'common/types'
import { Todolist } from './todolistsApi.types'

export const todolistsApi = {
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
