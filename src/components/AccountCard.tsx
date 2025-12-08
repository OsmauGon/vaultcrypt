
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
    >
      <Box component="summary" sx={{ cursor: 'pointer', outline: 'none' }}>
        <Typography  fontWeight="bold" sx={{display:"inline"}}>
          {account.serviceName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ml: 2}}>
          {decryptField(account.userEmail,cipher)}
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="body2" mt={1}>
          <strong>Usuario:</strong> {account.userName}
        </Typography>
    
        <Typography variant="body2">
          <strong>URL:</strong>{' '}
          <a href={account.serviceUrl} target="_blank" rel="noopener noreferrer">
            {account.serviceUrl.split('/')[2]}
          </a>
        </Typography>

        <Typography variant="body2">
          <strong>Contraseña:</strong>{' '}
          {showPassword ? decryptField(account.servicePassword, cipher) : '••••••••'}
          <IconButton size="small" onClick={() => setShowPassword(!showPassword)}>
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <Tooltip title="Copiar contraseña">
            <IconButton size="small" onClick={handleCopy}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Typography>

        {account.serviceDescription && (
          <Typography variant="body2" mt={2}>
            <strong>Descripción:</strong> {decryptField(account.serviceDescription,cipher)}
          </Typography>
        )}
        {account.created && (
          <Typography variant="body2" mt={2}>
            <strong>Creacion:</strong> {account.created}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
