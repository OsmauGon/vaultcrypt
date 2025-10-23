
// components/AccountCard.tsx
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import type { Cuenta } from '../pages/Historial';

type Props = {
  account: Cuenta;
};

export const AccountCard = ({ account }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(account.userPassword);
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
          {account.userEmail}
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
          {showPassword ? account.userPassword : '••••••••'}
          <IconButton size="small" onClick={() => setShowPassword(!showPassword)}>
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <Tooltip title="Copiar contraseña">
            <IconButton size="small" onClick={handleCopy}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Typography>

        {account.accountDescription && (
          <Typography variant="body2" mt={2}>
            <strong>Descripción:</strong> {account.accountDescription}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
