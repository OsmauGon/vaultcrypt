import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { LoginData } from '../schemas/loginSchema'
import { loginSchema } from '../schemas/loginSchema'
import { useFormSubmit } from '../hooks/formSubmit'
import { Link } from 'react-router-dom'



const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })

  const { submit, queryStatus } = useFormSubmit({
    endpoint: '/api/login', // opcional por ahora
    method: "GET",
    onSuccess: () => {
      console.log('✅ Login exitoso')
    },
    onError: () => {
      console.log('❌ Falló el login')
    },
  })

  const isLoading = queryStatus === 'loading'
  const isError = queryStatus === 'error'
  const isSuccess = queryStatus === 'success'
  const isNotFound = queryStatus === 'notfound'
  
  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Iniciar sesión
        </Typography>

        <Box component="form" onSubmit={handleSubmit(submit)} noValidate>
          {!(isSuccess || isError) ? 
          <>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register('emailPrincipal')}
            error={!!errors.emailPrincipal}
            helperText={errors.emailPrincipal?.message}
            disabled={isLoading}
          />

          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={isLoading}
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
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </Button>
          <div className='register-link'>Nuevo Aqui? <Link to='/register'>Registrese</Link></div>
          
          </>
          : ""
          
          }

          {isSuccess && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Sesión iniciada correctamente.
            </Alert>
          )}

          {isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Hubo un error al iniciar sesión. Intentá nuevamente.
            </Alert>
          )}
          {isNotFound && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Usuario no encontrado.
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  )
}

export default Login