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
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { editSchema } from '../schemas/editSchema'
import type { EditData } from '../schemas/editSchema'
import { useFormSubmit } from '../hooks/formSubmit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

const EditUser = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditData>({
    resolver: zodResolver(editSchema),
    defaultValues: {
        name: "",
        secretWord: '',
        emailPrincipal: '',
      emailList: [''],
      password: '',
    },
  })

const { fields, append, remove } = useFieldArray({
  control,
  name: 'emailList',
})

  const { submit, queryStatus } = useFormSubmit({
    endpoint: '/api/edit-user',
    onSuccess: () => console.log('✅ Datos actualizados'),
    onError: () => console.log('❌ Error al actualizar'),
  })

  const isLoading = queryStatus === 'loading'
  const isError = queryStatus === 'error'
  const isSuccess = queryStatus === 'success'

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Editar datos del usuario
        </Typography>

        <Box component="form" onSubmit={handleSubmit(submit)} noValidate>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Emails
          </Typography>

          <Stack spacing={2}>
            {fields.map((field, index) => (
              <Box key={field.id} display="flex" alignItems="center">
                <TextField
                  label={`Email ${index + 1}`}
                  fullWidth
                  {...register(`emailList.${index}`)}
                  error={!!errors.emailList?.[index]}
                  helperText={errors.emailList?.[index]?.message}
                />
                <IconButton
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => append('')}
            >
              Agregar otro email
            </Button>
          </Stack>

          <TextField
            label="Nueva Email Principal"
            type="password"
            fullWidth
            margin="normal"
            {...register('emailPrincipal')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            label="Nueva Nombre"
            type="password"
            fullWidth
            margin="normal"
            {...register('name')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            label="Nueva Palabra Secreta"
            type="password"
            fullWidth
            margin="normal"
            {...register('secretWord')}
            error={!!errors.password}
            helperText={errors.password?.message}
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