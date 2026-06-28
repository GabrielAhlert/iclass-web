import { z } from 'zod'

export const FIBONACCI_VALUES = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144] as const

export const taskSchema = z.object({
  id: z.string().uuid(),
  classId: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  fileUrl: z.string().nullable(),
  score: z.number(),
  expiresAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  class: z.object({
    id: z.string(),
    code: z.string(),
    period: z.string(),
    grade: z.string(),
  }),
  createdBy: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.string(),
  }),
})

export const createTaskSchema = z.object({
  classId: z.string().uuid('Selecione uma turma válida.'),
  title: z.string().min(1, 'Título é obrigatório.'),
  description: z.string().optional(),
  score: z.number().refine(
    (v) => (FIBONACCI_VALUES as readonly number[]).includes(v),
    { message: 'Pontuação deve ser um número de Fibonacci.' },
  ),
  expiresAt: z.string().optional(),
})

export const updateTaskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório.').optional(),
  description: z.string().optional(),
  score: z
    .number()
    .refine((v) => (FIBONACCI_VALUES as readonly number[]).includes(v), {
      message: 'Pontuação deve ser um número de Fibonacci.',
    })
    .optional(),
  expiresAt: z.string().optional(),
})

export type Task = z.infer<typeof taskSchema>
export type CreateTaskRequest = z.infer<typeof createTaskSchema>
export type UpdateTaskRequest = z.infer<typeof updateTaskSchema>
