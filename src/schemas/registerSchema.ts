import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  emailPrincipal: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
  secretWord: z.string().min(4, { message: 'La palabra secreta debe tener al menos 4 caracteres' }),
})

export type RegisterData = z.infer<typeof registerSchema>