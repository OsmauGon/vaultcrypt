import { z } from 'zod'

export const loginSchema = z.object({
  emailPrincipal: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'Mínimo 6 caracteres' }),
})

export type LoginData = z.infer<typeof loginSchema>