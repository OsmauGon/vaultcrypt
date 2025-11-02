import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { encryptField } from '../utils/encription';

type AccountDetailsProps = {
  data: {
    serviceName: string;
    serviceUrl: string;
    userName: string;
    userEmail: string;
    userPassword: string;
    accountType: string;
    accountDescription: string;
  };
  word: string
};

export const AlternativeEncryptPage2: React.FC<AccountDetailsProps> = ({ data, word}) => {
  const {
    serviceName,
    serviceUrl,
    userName,
    userEmail,
    userPassword,
    accountType,
    accountDescription,
  } = data;

 
  const renderRow2 = (label: string, value: string ) => (
    <Box>
      
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
        
        <Typography variant="body2">{value}</Typography>
    </Box>
  );

  return (
    <Card variant="outlined" sx={{ maxWidth: 600, margin: 'auto', mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Cuenta enviada...
        </Typography>
        
        {renderRow2('Servicio: ', encryptField(serviceName, word))}
        {renderRow2('URL del Servicio: ', encryptField(serviceUrl,word))}
        {renderRow2('Usuario: ', encryptField(userName,word))}
        {renderRow2('Email: ', encryptField(userEmail,word))}
        {renderRow2('Contraseña: ', encryptField(userPassword,word))}
        {renderRow2('Tipo de Cuenta: ', encryptField(accountType,word))}
        {renderRow2('Descripción: ', encryptField(accountDescription,word))}
      </CardContent>
    </Card>
  );
}; 