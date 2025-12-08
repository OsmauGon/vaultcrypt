import '../styles/account-form.css'
import React, {useState } from 'react';
import {TextField,MenuItem,Button,Paper,Grid, Typography, Alert, CircularProgress} from '@mui/material';
import { useUsuario } from '../hooks/useUsuario';
import { useFormSubmit } from '../hooks/formSubmit';
//import { Quickreply } from '@mui/icons-material';

const accountTypes: string[] = ['Red Social',"CorreoElectronico","BusquedaLaboral",'NubeDEdescargas',"ProgramacionDesarrollo","AplicacionDEdispositivo","BilleteraInversiones","Otros"]
type newAccount = {
    userId: number;
    serviceName: string;
    serviceUrl: string;
    userName: string;
    userEmail: string;
    servicePassword: string;
    serviceType:'' | 'Red Social'|"Correo Electronico"|"Busqueda laboral"|'Nube de descargas'|"Programacion/Desarrollo"|"Aplicacion de dispositivo"|"Billetera/inversiones"|"Otros",
    serviceDescription: string;
}

export const NewAccountForm2 = () => {
  const {usuario} = useUsuario()
  const {submit, queryStatus} = useFormSubmit({
    encrypt: true,
    method: 'POST',
    userKey: usuario?.secretWord,
    endpoint: '/cuentas',
    requiresAuth: true
  })
  
  const isLoading = queryStatus === 'loading'
  const isError = queryStatus === 'error'
  const isSuccess = queryStatus === 'success'
  // Estado inicial
  const [nuevaCuenta, setNuevaCuenta] = useState<newAccount>({
    userId: (usuario && usuario.id ) ? usuario.id : 0,
    userName: '',
    userEmail: '',
    serviceUrl: '',
    serviceType: '',
    serviceName: '',
    servicePassword: '',
    serviceDescription: ''
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
  await submit(nuevaCuenta); // Esperás que termine antes de seguir
};

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
      {!(isSuccess || isError) && <form onSubmit={handleSubmit2} className='account-form'>
        <Grid container spacing={1} >
          <Grid size={{ xs: 6, md: 6 }}>{/* Select - User Email */}
            <TextField
            disabled={isLoading}
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
            disabled={isLoading}
              select
              fullWidth
              label="Tipo de Cuenta"
              name="serviceType"
              value={nuevaCuenta.serviceType}
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
            disabled={isLoading}
              fullWidth
              label="Nombre de servicio"
              name="serviceName"
              value={nuevaCuenta.serviceName}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 12 }}>{/* Input - Service URL */}
            <TextField
            disabled={isLoading}
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
            disabled={isLoading}
              fullWidth
              label="Nombre de usuario"
              name="userName"
              value={nuevaCuenta.userName}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 12 }}>{/* Input - User Password */}
            <TextField
            disabled={isLoading}
              fullWidth
              label="Contraseña "
              name="servicePassword"
              type="password"
              value={nuevaCuenta.servicePassword}
              onChange={handleChange}
            />
          </Grid>
          <div></div>
          
        </Grid>
        <TextField
              disabled={isLoading}
              id='textarea-form'
              fullWidth
              label="Descripcion"
              name="serviceDescription"
              multiline
              rows={2}
              value={nuevaCuenta.serviceDescription}
              onChange={handleChange}
            />
        <Button
              id='account-form-button'
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
                      >
                        {isLoading ? 'Creando...' : 'Crear Cuenta'}
            </Button>
      </form>}
      {isLoading ?  <Typography>Enviando…</Typography> :""}
      {isSuccess ?  <Alert severity="success" sx={{ mt: 2 }}>✅ Enviado correctamente, esto fue lo que enviamos</Alert> :""}
      {isError ?  <Alert severity="error" sx={{ mt: 2 }}>❌ Error al enviar</Alert> :""}
    </Paper>
  );
};