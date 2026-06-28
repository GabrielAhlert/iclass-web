<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

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
      backgroundColor: 'rgba(99, 102, 241, 0.75)',
      borderColor: 'rgba(99, 102, 241, 1)',
      borderWidth: 1,
      borderRadius: 4,
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
      <Bar :data="chartData" :options="options" />
    </CardContent>
  </Card>
</template>
