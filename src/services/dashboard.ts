import http from './http'
import type { ChartData, DashboardData } from '@/schemas/dashboard.schema'

export const dashboardService = {
  async get(): Promise<DashboardData> {
    const response = await http.get<DashboardData>('/api/v1/dashboard')
    return response.data
  },

  async getCharts(): Promise<ChartData> {
    const response = await http.get<ChartData>('/api/v1/dashboard/charts')
    return response.data
  },
}
