
//import {MainLayout} from '../layout/MainLayout';
import { useUsuario } from '../hooks/useUsuario';
import { useFormSubmit } from '../hooks/formSubmit';
import { RequireAuthNotice } from '../components/RequireAuthNotice';
import { Box, Typography } from '@mui/material';
import { NewAccountForm } from '../components/NewAccountForm';

export const Encrypt = () => {
  const {usuario} = useUsuario()
  const {queryStatus} = useFormSubmit({
    encrypt: true,
    method: 'PUT',
    userKey: usuario?.palabraSecreta ? usuario?.palabraSecreta : 'claveMaestraDelUsuario',
    endpoint: '/api/accounts'

  })
  


  return (
    usuario ? <>
            
            <Typography variant="h4" gutterBottom>Pagina de Encriptacion</Typography>
            <Typography >Nueva cuenta a encriptar</Typography>
            <Box sx={{ maxWidth: 600, mx: 'auto', mt: 2 }}>
             {queryStatus === 'idle' && <NewAccountForm ></NewAccountForm>}
             {queryStatus === 'loading' && <Typography>Enviando…</Typography>}
              {queryStatus === 'success' && <Typography>✅ Enviado correctamente</Typography>}
              {queryStatus === 'error' && <Typography>❌ Error al enviar</Typography>}
              {/* {status == 'idle' ? <NewAccountForm4 setStatus={setStatus}></NewAccountForm4>
                                : <div style={{ marginTop: '1rem' }}>
                                    {status === 'loading' && (
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <CircularProgress size={20} />
                                        <Typography>Enviando información…</Typography>
                                      </div>
                                    )}
                                    {status === 'success' && (
                                      <Typography color="success.main">✅ Mensaje recibido correctamente</Typography>
                                    )}
                                  </div>

              
            } */}
            </Box>  
          </>
          : <RequireAuthNotice></RequireAuthNotice>
  );
};

