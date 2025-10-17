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
import { useState, useRef } from 'react'

type EditData = {
  name?: string
  emailPrincipal?: string
  password?: string
  secretWord?: string
  emailList?: string[]
}
type RegisteredField = 'name' | 'emailPrincipal' | 'password' | 'secretWord'

const EditUser3 = () => {
  const [emailList, setEmailList] = useState<string[]>([''])
  const [emailListError, setEmailListError] = useState<string | null>(null)

  const initialUserData: EditData = {
    name: 'Juan',
    emailPrincipal: 'juan@example.com',
    password: '',
    secretWord: '',
    emailList: ['juan.alt@example.com'],
  }

  const initialRef = useRef<EditData>(initialUserData)

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<Omit<EditData, 'emailList'>>({
    resolver: zodResolver(editSchema.omit({ emailList: true })),
    defaultValues: {
      name: initialUserData.name,
      emailPrincipal: initialUserData.emailPrincipal,
      password: '',
      secretWord: '',
    },
  })

  const { submit, queryStatus } = useFormSubmit<EditData>({
    endpoint: '/api/edit-user',
    encrypt: false,
    userKey: 'clave123',
    onSuccess: () => console.log('✅ Datos actualizados'),
    onError: () => console.log('❌ Error al actualizar'),
  })

  const isLoading = queryStatus === 'loading'
  const isError = queryStatus === 'error'
  const isSuccess = queryStatus === 'success'

  const handleEmailChange = (index: number, value: string) => {
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
    const currentData: EditData = {
      ...data,
      emailList,
    }

    const modifiedFields = Object.fromEntries(
      Object.entries(currentData).filter(([key, value]) => {
        const original = initialRef.current[key as keyof EditData]

        if (Array.isArray(value) && Array.isArray(original)) {
          return JSON.stringify(value) !== JSON.stringify(original)
        }

        return value !== original
      })
    )

    const result = editSchema.partial().safeParse(modifiedFields)

    if (!result.success) {
      const firstIssue = result.error.issues[0]

      if (firstIssue.path[0] === 'emailList') {
        setEmailListError(firstIssue.message)
      } else {
        setError(firstIssue.path[0] as RegisteredField, {
        type: 'manual',
        message: firstIssue.message,
      })
      }

      return
    }

    clearErrors()
    setEmailListError(null)
    submit(modifiedFields as EditData)
  })

  const watchedFields = watch()
  const currentData: EditData = {
    ...watchedFields,
    emailList,
  }

  const modifiedKeys = Object.entries(currentData)
    .filter(([key, value]) => {
      const original = initialRef.current[key as keyof EditData]
      if (Array.isArray(value) && Array.isArray(original)) {
        return JSON.stringify(value) !== JSON.stringify(original)
      }
      return value !== original
    })
    .map(([key]) => key)

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

          {emailListError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {emailListError}
            </Alert>
          )}

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

          {modifiedKeys.length > 0 && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Vas a modificar: {modifiedKeys.join(', ')}
            </Alert>
          )}

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

export default EditUser3