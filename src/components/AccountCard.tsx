
// components/AccountCard.tsx
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import type { Cuenta } from '../pages/Historial';
import { decryptField } from '../utils/encription';

type Props = {
  account: Cuenta;
  cipher: string;
};
const dateTraductor = (fechaISO: string) =>{
  const fecha = new Date(fechaISO);

// Extraer componentes
const dia = fecha.getDate().toString().padStart(2, '0');
const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // meses empiezan en 0
const año = fecha.getFullYear();

// Formato final
return `${dia}/${mes}/${año}`;

}

export const AccountCard = ({ account, cipher }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(account.servicePassword);
  };

  return (
    <Box className='account-card'
      component="details"
      sx={{
        border: '1px solid #ccc',
        borderRadius: 2,
        p: 2,
        mb: 1,
        transition: 'all 0.3s ease',
        '&[open]': {
          boxShadow: 3,
          borderColor: 'primary.main',
        },
      }}
      onClick={handleCopy}
    >
      <Box component="summary" sx={{ cursor: 'pointer', outline: 'none' }}>
        <Typography  fontWeight="bold" sx={{display:"inline"}}>
          {account.serviceName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ml: 2}}>
          {/* (account.userEmail && decryptField(account.userEmail,cipher).length > 0) ? decryptField(account.userEmail,cipher) : "Email no asignado" */
          account.userEmail}
        </Typography>
      </Box>{/*userEmail*/}

      <Box mt={2}>
        <Typography variant="body2" mt={1}>
          <strong>Usuario:</strong> {(account.userName.length > 0) ? account.userName : "No asignado"}
        </Typography>{/* userName */}
    
        <Typography variant="body2">
          <strong>URL:</strong>{' '}
          {(account.serviceUrl.length > 0) ? <a href={account.serviceUrl} target="_blank" rel="noopener noreferrer">{account.serviceUrl.split('/')[2]}</a>
                                            : "No asignado"
          }
          </Typography>{/* serviceUrl */}

        <Typography variant="body2">
          <strong>Contraseña:</strong>{' '}
          {showPassword ? decryptField(account.servicePassword, cipher) : ''}
          {(account.servicePassword && decryptField(account.servicePassword, cipher).length > 0) ? <>
                                    <IconButton size="small" onClick={() => setShowPassword(!showPassword)}>
                                      <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                    <Tooltip title="Copiar contraseña">
                                      <IconButton size="small" onClick={handleCopy}>
                                        <ContentCopyIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                    </> 
          : "No asignado"
          }
        </Typography>{/* userPassword */}
        <Typography variant="body2">
          <strong>Creacion:</strong> {dateTraductor(account.creadoEn)}
        </Typography>{/* fecha de creacion */}
        {account.serviceDescription && (
          <Typography variant="body2" mt={2}>
            <strong>Descripción:</strong> {account.serviceDescription ? decryptField(account.serviceDescription,cipher) : "No definido"}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
