


import { z } from 'zod'

export const editSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }).optional(),
  emailPrincipal: z.string().email({ message: 'Email inválido' }).optional(),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }).optional(),
  secretWord: z.string().min(4, { message: 'La palabra secreta debe tener al menos 4 caracteres' }).optional(),
  emailList: z
  .array(z.string().email({ message: 'Email inválido' }))
  .min(1, { message: 'Debe ingresar al menos un email' })
  .optional()

})

export type EditData = {
  name?: string
  emailPrincipal?: string
  password?: string
  secretWord?: string
  emailList: string[] // ← obligatorio para useFieldArray
}
