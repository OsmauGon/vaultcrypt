import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  IconButton,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { editSchema } from '../schemas/editSchema'
import { useFormSubmit } from '../hooks/formSubmit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import { z } from 'zod'

// Tipo manual para evitar conflictos con emailList
type EditData = {
  name?: string
  emailPrincipal?: string
  password?: string
  secretWord?: string
  emailList?: string[]
}

const EditUser = () => {
  const [emailList, setEmailList] = useState<string[]>([''])

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Omit<EditData, 'emailList'>>({
    resolver: zodResolver(editSchema.omit({ emailList: true })),
    defaultValues: {
      name: '',
      emailPrincipal: '',
      password: '',
      secretWord: '',
    },
  })

 const { submit, queryStatus } = useFormSubmit<EditData>({
  endpoint: '/api/edit-user',
  encrypt: false,
  userKey: "palabrasecretadelausuario",
  onSuccess: () => console.log('✅ Datos actualizados'),
  onError: () => console.log('❌ Error al actualizar'),
})

  const isLoading = queryStatus === 'loading'
  const isError = queryStatus === 'error'
  const isSuccess = queryStatus === 'success'

  const handleEmailChange = (index: number, value: string) => {
    console.log("se ejecuto handlechange")
    const updated = [...emailList]
    updated[index] = value
    setEmailList(updated)
  }

  const handleAddEmail = () => {
    setEmailList([...emailList, ''])
  }

  const handleRemoveEmail = (index: number) => {
    if (emailList.length === 1) return
    const updated = [...emailList]
    updated.splice(index, 1)
    setEmailList(updated)
  }

  const onSubmit = handleSubmit((data) => {
  // Validar emailList manualmente con Zod
  const emailValidation = z
    .array(z.string().email({ message: 'Email inválido' }))
    .min(1, { message: 'Debe ingresar al menos un email' })

  const result = emailValidation.safeParse(emailList)

  if (!result.success) {
    const firstIssue = result.error.issues[0]
    setError('emailPrincipal', {
      type: 'manual',
      message: firstIssue.message,
    })
    return
  }

  clearErrors('emailPrincipal')

  // Construir objeto completo con tipo EditData
  const fullData: EditData = {
    ...data,
    emailList,
  }

  submit(fullData)
})

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Editar datos del usuario
        </Typography>

        <Box component="form" onSubmit={onSubmit} noValidate>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            label="Email principal"
            fullWidth
            margin="normal"
            {...register('emailPrincipal')}
            error={!!errors.emailPrincipal}
            helperText={errors.emailPrincipal?.message}
          />

          <Typography variant="h6" sx={{ mt: 2 }}>
            Emails secundarios
          </Typography>

          <Stack spacing={2}>
            {emailList.map((email, index) => (
              <Box key={index} display="flex" alignItems="center">
                <TextField
                  label={`Email ${index + 1}`}
                  fullWidth
                  value={email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                />
                <IconButton
                  onClick={() => handleRemoveEmail(index)}
                  disabled={emailList.length === 1}
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddEmail}
            >
              Agregar otro email
            </Button>
          </Stack>

          <TextField
            label="Nueva contraseña"
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            label="Palabra secreta"
            fullWidth
            margin="normal"
            {...register('secretWord')}
            error={!!errors.secretWord}
            helperText={errors.secretWord?.message}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? 'Guardando...' : 'Guardar cambios'}
          </Button>

          {isSuccess && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Datos actualizados correctamente.
            </Alert>
          )}
          {isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Error al actualizar los datos. Intentá nuevamente.
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  )
}

export default EditUser