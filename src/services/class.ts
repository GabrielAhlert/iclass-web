import http from './http'
import type { Class, CreateClassRequest, UpdateClassRequest } from '@/schemas/class.schema'

export const classService = {
  async list(): Promise<Class[]> {
    const response = await http.get<Class[]>('/api/v1/classes')
    return response.data
  },

  async getById(id: string): Promise<Class> {
    const response = await http.get<Class>(`/api/v1/classes/${id}`)
    return response.data
  },

  async create(data: CreateClassRequest): Promise<Class> {
    const response = await http.post<Class>('/api/v1/classes', data)
    return response.data
  },

  async update(id: string, data: UpdateClassRequest): Promise<Class> {
    const response = await http.patch<Class>(`/api/v1/classes/${id}`, data)
    return response.data
  },

  async remove(id: string): Promise<void> {
    await http.delete(`/api/v1/classes/${id}`)
  },
}
