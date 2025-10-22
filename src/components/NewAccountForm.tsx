import '../styles/account-form.css'
import React, {useState } from 'react';
import {TextField,MenuItem,Button,Paper,Grid} from '@mui/material';
import { useUsuario } from '../hooks/useUsuario';
import { useFormSubmit } from '../hooks/formSubmit';
//import { Quickreply } from '@mui/icons-material';

const accountTypes: string[] = ['Red Social',"Correo Electronico","Busqueda laboral",'Nube de descargas',"Programacion/Desarrollo","Aplicacion de dispositivo","Billetera/inversiones","Otros"]
type newAccount = {
    serviceName: string;
    serviceUrl: string;
    userName: string;
    userEmail: string;
    userPassword: string;
    accountType:'' | 'Red Social'|"Correo Electronico"|"Busqueda laboral"|'Nube de descargas'|"Programacion/Desarrollo"|"Aplicacion de dispositivo"|"Billetera/inversiones"|"Otros",
    accountDescription: string;
}

export const NewAccountForm = () => {
  const {usuario} = useUsuario()
  const {submit} = useFormSubmit({
    encrypt: true,
    method: 'PUT',
    userKey: 'claveMaestraDelUsuario',
    endpoint: '/api/accounts'

  })
  // Estado inicial
  const [nuevaCuenta, setNuevaCuenta] = useState<newAccount>({
    userEmail: '',
    accountType: '',
    serviceName: '',
    serviceUrl: '',
    userName: '',
    userPassword: '',
    accountDescription: ''
  });
  // Manejador de cambios genérico
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    const { name, value } = event.target;
    
    setNuevaCuenta(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  
const handleSubmit2 = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log('se ejecuto handleSubmit');

  await submit(nuevaCuenta); // Esperás que termine antes de seguir
};

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <form onSubmit={handleSubmit2} className='account-form'>
        <Grid container spacing={1} >
          <Grid size={{ xs: 6, md: 6 }}>{/* Select - User Email */}
            <TextField
              select
              fullWidth
              label="Email asignados"
              name="userEmail"
              value={nuevaCuenta.userEmail}
              onChange={handleChange}
            >
              {usuario?.emailList.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 6, md: 6 }}>{/* Select - Account Type */}
            <TextField
              select
              fullWidth
              label="Tipo de Cuenta"
              name="accountType"
              value={nuevaCuenta.accountType}
              onChange={handleChange}
            >
              {accountTypes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 6, md: 12 }}>{/* Input - Service Name */}
            <TextField
              fullWidth
              label="Nombre de servicio"
              name="serviceName"
              value={nuevaCuenta.serviceName}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 12 }}>{/* Input - Service URL */}
            <TextField
              fullWidth
              label="URL de servicio"
              name="serviceUrl"
              type="url"
              value={nuevaCuenta.serviceUrl}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 12 }}>{/* Input - User Name */}
            <TextField
              fullWidth
              label="Nombre de usuario"
              name="userName"
              value={nuevaCuenta.userName}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 12 }}>{/* Input - User Password */}
            <TextField
              fullWidth
              label="Contraseña "
              name="userPassword"
              type="password"
              value={nuevaCuenta.userPassword}
              onChange={handleChange}
            />
          </Grid>
          <div></div>
          
        </Grid>
        <TextField
              id='textarea-form'
              fullWidth
              label="Descripcion"
              name="accountDescription"
              multiline
              rows={2}
              value={nuevaCuenta.accountDescription}
              onChange={handleChange}
            />
        <Button
              id='account-form-button'
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Crear Cuenta
            </Button>
      </form>
    </Paper>
  );
};