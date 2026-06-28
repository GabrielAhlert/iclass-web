import { z } from 'zod'
import { userSchema } from './user.schema'

const periodRegex = /^\d{4}\/[12]$/
const gradeRegex = /^[0-9]{1,2}[A-Za-z]{1,2}$/

export const classSchema = z.object({
  id: z.string().uuid(),
  code: z.string(),
  period: z.string(),
  grade: z.string(),
  teacher: userSchema,
  students: z.array(userSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const createClassSchema = z.object({
  period: z.string().regex(periodRegex, 'Período inválido. Use AAAA/1 ou AAAA/2.'),
  grade: z.string().regex(gradeRegex, 'Série inválida. Ex: 3A, 10B.'),
  teacherId: z.string().uuid('Selecione um professor válido.'),
  studentIds: z.array(z.string().uuid()).min(1, 'Selecione pelo menos um aluno.'),
})

export const updateClassSchema = z.object({
  period: z.string().regex(periodRegex, 'Período inválido. Use AAAA/1 ou AAAA/2.').optional(),
  grade: z.string().regex(gradeRegex, 'Série inválida. Ex: 3A, 10B.').optional(),
  teacherId: z.string().uuid('Selecione um professor válido.').optional(),
  studentIds: z.array(z.string().uuid()).min(1, 'Selecione pelo menos um aluno.').optional(),
})

export type Class = z.infer<typeof classSchema>
export type CreateClassRequest = z.infer<typeof createClassSchema>
export type UpdateClassRequest = z.infer<typeof updateClassSchema>
