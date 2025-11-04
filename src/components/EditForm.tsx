import { useState } from 'react';
import type { UserCredentials } from '../pages/EditPage4';
import { Alert, Box, Button, CircularProgress, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import { useFormSubmit } from '../hooks/formSubmit';

import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
//import type { number } from 'zod';

type EditFormProps = {
    initialCredentials: UserCredentials
}

export const EditForm = ({ initialCredentials } :EditFormProps) => {
  const [initialUser] = useState<UserCredentials>(initialCredentials)
  const [formState, setFormState] = useState<UserCredentials>(initialCredentials);

  const { submit, queryStatus } = useFormSubmit<UserCredentials>({
      endpoint: '/api/edit',
      method: 'PATCH',//creo que es este
      encrypt: false,
      userKey: 'clave123',
      onSuccess: () => console.log('✅ Datos actualizados'),
      onError: () => console.log('❌ Error al actualizar'),
    })
  
    const isLoading = queryStatus === 'loading'
    const isError = queryStatus === 'error'
    const isSuccess = queryStatus === 'success'
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const handleChange = (field: string, value: string | string[]) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleEmailChange = (index :number, value :string) => {
    const updatedList = [...formState.emailList];
    updatedList[index] = value;
    setFormState(prev => ({ ...prev, emailList: updatedList }));
  };

  const handleRemoveEmail = (index :number) => {
    const updatedList = formState.emailList.filter((_, i) => i !== index);
    setFormState(prev => ({ ...prev, emailList: updatedList }));
  };

  const handleAddEmail = () => {
    if(formState.emailList[formState.emailList.length - 1] === "") return
    else setFormState(prev => ({ ...prev, emailList: [...prev.emailList, ''] }));
  };
  const handleSubmit =(e :React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const noEmails = formState.emailList.filter(item => !regexEmail.test(item));
    if(noEmails.length != 0) {
      alert("Error, verifique el formato de los emails que esta enviando")
      return
    }
    submit(formState)
  }
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const nModificado :boolean = formState.name == initialUser.name
const eModificado :boolean = formState.emailPrincipal == initialUser.emailPrincipal 
const pModificado :boolean = formState.password == initialUser.password
const lModificado :boolean = formState.emailList == initialUser.emailList 

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  return (
    <>
    <Container maxWidth="sm" sx={{ py: 2 }}>
      <Paper elevation={3} sx={{ p: 1 }}>
        <Typography variant="h4" gutterBottom>
          Editar datos del usuario
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          {!(isSuccess || isError) ? 
          <>
            <TextField
              label="Nombre"
              fullWidth
              margin="normal"
              value={formState.name}
              onChange={e => handleChange('name', e.target.value)}
            />
            <TextField
              label="Email principal"
              fullWidth
              margin="normal"
              value={formState.emailPrincipal}
              onChange={e => handleChange('emailPrincipal', e.target.value)}
            />
            <TextField
              label="Nueva contraseña"
              type="password"
              fullWidth
              margin="normal"
              value={formState.password}
              onChange={e => handleChange('password', e.target.value)}
            />

            <Typography variant="h6" sx={{ mt: 2 }}>
              Emails secundarios
            </Typography>
            <Stack spacing={2}>
              {formState.emailList.map((email, index) => (
                <Box key={index} display="flex" alignItems="center">
                  <TextField
                    label={`Email ${index + 1}`}
                    fullWidth
                    value={email}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                  />
                  <IconButton
                    onClick={() => handleRemoveEmail(index)}
                    disabled={formState.emailList.length === 1}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon/>
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
            
            {
            (!nModificado || !eModificado || !pModificado  || !lModificado) && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Vas a modificar: 
                <ul>
                  {nModificado ? "" : <li>Nombre de usuario</li>}
                  {eModificado ? "" : <li>Email de usuario</li>}
                  {pModificado ? "" : <li>Contraseña de usuario</li>}
                  {lModificado ? "" : <li>Emails Secundarios de usuario</li>}
                </ul>
              </Alert>
            )
            }
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={isLoading || formState === initialUser}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? 'Guardando...' : 'Guardar cambios'}
            </Button>
            
          </> : "" }

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
    </>
  );
};

