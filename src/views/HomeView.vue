<script setup lang="ts">
import { BookOpen, CheckSquare, ClipboardList, Users2 } from '@lucide/vue'
import { useAuthStore } from '@/stores/auth.store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const authStore = useAuthStore()

const metrics = [
  { label: 'Turmas', value: '—', icon: Users2 },
  { label: 'Alunos', value: '—', icon: BookOpen },
  { label: 'Tarefas Pendentes', value: '—', icon: ClipboardList },
  { label: 'Correções Pendentes', value: '—', icon: CheckSquare },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">
        Bem-vindo, {{ authStore.user?.name }}
      </h1>
      <p class="text-sm text-muted-foreground">Aqui está um resumo da sua plataforma.</p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card v-for="metric in metrics" :key="metric.label">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">{{ metric.label }}</CardTitle>
          <component :is="metric.icon" class="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ metric.value }}</div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
