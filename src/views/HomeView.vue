<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { toast } from 'vue-sonner'
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Clock,
  GraduationCap,
  Star,
  Trophy,
  Users,
} from '@lucide/vue'
import { useAuthStore } from '@/stores/auth.store'
import { dashboardService } from '@/services/dashboard'
import type { DashboardData } from '@/schemas/dashboard.schema'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const authStore = useAuthStore()

const data = ref<DashboardData | null>(null)
const loading = ref(false)

const admin = computed(() => (data.value?.role === 'admin' ? data.value : null))
const teacher = computed(() => (data.value?.role === 'teacher' ? data.value : null))
const student = computed(() => (data.value?.role === 'student' ? data.value : null))

async function loadDashboard() {
  loading.value = true
  try {
    data.value = await dashboardService.get()
  } catch {
    toast.error('Erro ao carregar o dashboard.')
  } finally {
    loading.value = false
  }
}

onMounted(loadDashboard)
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">
        Bem-vindo, {{ authStore.user?.name }}
      </h1>
      <p class="text-sm text-muted-foreground">Aqui está um resumo da sua plataforma.</p>
    </div>

    <!-- Skeleton de carregamento -->
    <template v-if="loading">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card v-for="i in 4" :key="i">
          <CardHeader class="pb-2">
            <Skeleton class="h-4 w-28" />
          </CardHeader>
          <CardContent>
            <Skeleton class="h-8 w-14" />
            <Skeleton class="mt-2 h-3 w-24" />
          </CardContent>
        </Card>
      </div>
    </template>

    <!-- Admin -->
    <template v-else-if="admin">
      <div class="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Usuários</CardTitle>
            <Users class="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ admin.users.total }}</div>
            <p class="text-xs text-muted-foreground">cadastrados na plataforma</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Turmas</CardTitle>
            <BookOpen class="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ admin.classes.total }}</div>
            <p class="text-xs text-muted-foreground">turmas ativas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Tarefas</CardTitle>
            <ClipboardList class="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ admin.tasks.total }}</div>
            <p class="text-xs text-muted-foreground">{{ admin.tasks.submissions }} submissões</p>
          </CardContent>
        </Card>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-medium text-muted-foreground">Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ admin.users.admins }}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-medium text-muted-foreground">Professores</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ admin.users.teachers }}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-medium text-muted-foreground">Alunos</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ admin.users.students }}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-medium text-muted-foreground">
              Correções Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ admin.tasks.pendingGrades }}</div>
          </CardContent>
        </Card>
      </div>
    </template>

    <!-- Teacher -->
    <template v-else-if="teacher">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Minhas Turmas</CardTitle>
            <BookOpen class="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ teacher.overview.totalClasses }}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Alunos</CardTitle>
            <GraduationCap class="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ teacher.overview.totalStudents }}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Tarefas</CardTitle>
            <ClipboardList class="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ teacher.overview.totalTasks }}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Correções Pendentes</CardTitle>
            <Clock class="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ teacher.overview.pendingGrades }}</div>
          </CardContent>
        </Card>
      </div>

      <div class="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Turma</TableHead>
              <TableHead>Série</TableHead>
              <TableHead>Período</TableHead>
              <TableHead class="text-right">Alunos</TableHead>
              <TableHead class="text-right">Tarefas</TableHead>
              <TableHead class="text-right">Pendentes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-if="teacher.classes.length === 0">
              <TableCell colspan="6" class="py-8 text-center text-muted-foreground">
                Nenhuma turma encontrada.
              </TableCell>
            </TableRow>
            <TableRow v-for="cls in teacher.classes" :key="cls.id">
              <TableCell class="font-medium">{{ cls.code }}</TableCell>
              <TableCell>{{ cls.grade }}</TableCell>
              <TableCell>{{ cls.period }}</TableCell>
              <TableCell class="text-right">{{ cls.studentCount }}</TableCell>
              <TableCell class="text-right">{{ cls.taskCount }}</TableCell>
              <TableCell class="text-right">{{ cls.pendingGrades }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </template>

    <!-- Student -->
    <template v-else-if="student">
      <div class="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Total</CardTitle>
            <ClipboardList class="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ student.tasks.total }}</div>
            <p class="text-xs text-muted-foreground">tarefas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Entregues</CardTitle>
            <CheckCircle2 class="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ student.tasks.submitted }}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Pendentes</CardTitle>
            <Clock class="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ student.tasks.pending }}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Expiradas</CardTitle>
            <AlertTriangle class="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ student.tasks.expired }}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Corrigidas</CardTitle>
            <Star class="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ student.tasks.graded }}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Pontuação</CardTitle>
          <Trophy class="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-3 divide-x">
            <div class="pr-4 text-center">
              <div class="text-2xl font-bold">{{ student.score.totalEarned }}</div>
              <p class="mt-1 text-xs text-muted-foreground">pontos ganhos</p>
            </div>
            <div class="px-4 text-center">
              <div class="text-2xl font-bold">{{ student.score.totalPossible }}</div>
              <p class="mt-1 text-xs text-muted-foreground">pontos possíveis</p>
            </div>
            <div class="pl-4 text-center">
              <div class="text-2xl font-bold">{{ student.score.average }}%</div>
              <p class="mt-1 text-xs text-muted-foreground">média</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </template>
  </div>
</template>
