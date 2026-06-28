import http from './http'
import type { DashboardData } from '@/schemas/dashboard.schema'

export const dashboardService = {
  async get(): Promise<DashboardData> {
    const response = await http.get<DashboardData>('/api/v1/dashboard')
    return response.data
  },
}
