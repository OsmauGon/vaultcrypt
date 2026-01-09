import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  emailPrincipal: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
  secretWord: z.string().min(4, { message: 'La palabra secreta debe tener al menos 4 caracteres' }),
  confirmPassword: z.string(),
  confirmSecret: z.string()

}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "Las contraseñas no coinciden",
      path: ["confirmPassword"],
    });
  }

  if (data.secretWord!== data.confirmSecret) {
    ctx.addIssue({
      code: "custom",
      message: "La palabras secretas deben coincidir",
      path: ["confirmSecret"],
    });
  }
});


export type RegisterData = z.infer<typeof registerSchema>