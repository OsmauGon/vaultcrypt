
//import {MainLayout} from '../layout/MainLayout';
import { useUsuario } from '../hooks/useUsuario';
import { RequireAuthNotice } from '../components/RequireAuthNotice';
import { Box, Typography } from '@mui/material';
//import { NewAccountForm } from '../components/NewAccountForm2'; DESBLOQUEAR CUANDO EL BACKEND ESTE OPERATIVO
import { AlternativeEncryptPage } from '../components/AlternativeEncryptPage';

export const Encrypt = () => {
  const {usuario} = useUsuario()
  


  return (
    usuario ? <>
            
            <Typography variant="h4" gutterBottom>Pagina de Encriptacion</Typography>
            <Typography >Nueva cuenta a encriptar</Typography>
            <Box sx={{ maxWidth: 600, mx: 'auto', mt: 2 }}>
            {/*  <NewAccountForm ></NewAccountForm> ESTE LO USAREMOS CUANDO EL BACKEND ESTE OPERATIVO */}
            <AlternativeEncryptPage></AlternativeEncryptPage> 
             
            </Box>  
          </>
          //: <RequireAuthNotice></RequireAuthNotice>
          :<>
            <RequireAuthNotice></RequireAuthNotice>
          </>
  );
};

