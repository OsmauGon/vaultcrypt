import React from 'react';
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
};