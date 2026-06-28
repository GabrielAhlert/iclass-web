<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

const props = defineProps<{
  title: string
  labels: string[]
  data: number[]
  label: string
}>()

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: props.label,
      data: props.data,
      borderColor: 'rgba(99, 102, 241, 1)',
      backgroundColor: 'rgba(99, 102, 241, 0.15)',
      borderWidth: 2,
      tension: 0.3,
      fill: true,
      pointRadius: 4,
      pointBackgroundColor: 'rgba(99, 102, 241, 1)',
    },
  ],
}))

const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { precision: 0 },
    },
  },
}
</script>

<template>
  <Card>
    <CardHeader class="pb-2">
      <CardTitle class="text-sm font-medium">{{ title }}</CardTitle>
    </CardHeader>
    <CardContent>
      <Line :data="chartData" :options="options" />
    </CardContent>
  </Card>
</template>
