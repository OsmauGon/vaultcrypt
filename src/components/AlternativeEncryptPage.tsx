/* import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Link,
} from '@mui/material';

type AccountDetailsProps = {
  data: {
    fecha: string;
    serviceName: string;
    serviceUrl: string;
    userName: string;
    userEmail: string;
    userPassword: string;
    accountType: string;
    accountDescription: string;
  };
};

export const AlternativeEncryptPage: React.FC<AccountDetailsProps> = ({ data }) => {
  const {
    fecha,
    serviceName,
    serviceUrl,
    userName,
    userEmail,
    userPassword,
    accountType,
    accountDescription,
  } = data;

  const renderRow = (label: string, value: string | JSX.Element) => (
    <Grid container spacing={1} sx={{ mb: 1 }}>
      <Grid>
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
      </Grid>
      <Grid>
        <Typography variant="body2">{value}</Typography>
      </Grid>
    </Grid>
  );

  return (
    <Card variant="outlined" sx={{ maxWidth: 600, margin: 'auto', mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Detalles de la Cuenta
        </Typography>
        {renderRow('Fecha', fecha)}
        {renderRow('Servicio', serviceName)}
        {renderRow('URL del Servicio', <Link href={serviceUrl} target="_blank" rel="noopener">{serviceUrl}</Link>)}
        {renderRow('Usuario', userName)}
        {renderRow('Email', userEmail)}
        {renderRow('Contraseña', userPassword)}
        {renderRow('Tipo de Cuenta', accountType)}
        {renderRow('Descripción', accountDescription)}
      </CardContent>
    </Card>
  );
}; */





















import '../styles/account-form.css'
import React, {useState } from 'react';
import {TextField,MenuItem,Button,Paper,Grid, Typography, Alert, CircularProgress} from '@mui/material';
import { useUsuario } from '../hooks/useUsuario';
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

export const AlternativeEncryptPage = () => {
  const {usuario} = useUsuario()
  const [accion, setAccion] = useState<'en espera' | 'cargando' | 'listo'>('en espera')
  /* 
  const {submit, queryStatus} = useFormSubmit({
    encrypt: true,
    method: 'POST',
    userKey: 'claveMaestraDelUsuario',
    endpoint: '/api/accounts'

  })
  
   */
  const isLoading = accion === 'cargando'
  const isSuccess = accion === 'listo'
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
  setAccion('cargando')
  setTimeout(()=>{setAccion('listo');console.log(nuevaCuenta)},5000)
  
  //await submit(nuevaCuenta); // Esperás que termine antes de seguir
};

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
      {(accion === 'en espera') && <form onSubmit={handleSubmit2} className='account-form'>
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
              {(usuario && usuario.emailList) ? usuario?.emailList.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
                                                 
              ))
                                              : <MenuItem  value={'prueba@hotmail.com'}>
                                                                                    {'prueba@hotmail.com'}
                                                                                  </MenuItem>
                                                }
            </TextField>
          </Grid>
          <Grid size={{ xs: 6, md: 6 }}>{/* Select - Account Type */}
            <TextField
            disabled={isLoading}
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
              name="userPassword"
              type="password"
              value={nuevaCuenta.userPassword}
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
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
                      >
                        {isLoading ? 'Creando...' : 'Crear Cuenta'}
            </Button>
      </form>}
      {isLoading ?  <Typography>Enviando…</Typography> :""}
      {isSuccess ?  <Alert severity="success" sx={{ mt: 2 }}>✅ Enviado correctamente, verifique en consola</Alert> :""}
    </Paper>
  );
};