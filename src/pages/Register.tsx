import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '../schemas/registerSchema'
import { useFormSubmit } from '../hooks/formSubmit'

type RegisterData = {
  name: string
  emailPrincipal: string
  password: string
  secretWord: string
}

const Register = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      emailPrincipal: '',
      password: '',
      secretWord: '',
    },
  })

  const { submit, queryStatus } = useFormSubmit<RegisterData>({
    endpoint: '/api/register-user',
    encrypt: false,
    userKey: 'clave123',
    onSuccess: () => console.log('✅ Usuario registrado'),
    onError: () => console.log('❌ Error en el registro'),
  })

  const isLoading = queryStatus === 'loading'
  const isError = queryStatus === 'error'
  const isSuccess = queryStatus === 'success'

  const onSubmit = handleSubmit((data) => {
    clearErrors()
    submit(data)
  })

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Registro de nuevo usuario
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

          <TextField
            label="Contraseña"
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
            {isLoading ? 'Registrando...' : 'Registrar usuario'}
          </Button>

          {isSuccess && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Usuario registrado correctamente.
            </Alert>
          )}
          {isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Error al registrar. Intentá nuevamente.
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  )
}

export default Register