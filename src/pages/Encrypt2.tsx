
//import {MainLayout} from '../layout/MainLayout';
import { useUsuario } from '../hooks/useUsuario';
import { RequireAuthNotice } from '../components/RequireAuthNotice';
import { Box, Typography } from '@mui/material';
import { NewAccountForm } from '../components/NewAccountForm2';

export const Encrypt = () => {
  const {usuario} = useUsuario()
  


  return (
    usuario ? <>
            
            <Typography variant="h4" gutterBottom>Pagina de Encriptacion</Typography>
            <Typography >Nueva cuenta a encriptar</Typography>
            <Box sx={{ maxWidth: 600, mx: 'auto', mt: 2 }}>
             <NewAccountForm ></NewAccountForm>
             
            </Box>  
          </>
          : <RequireAuthNotice></RequireAuthNotice>
  );
};

