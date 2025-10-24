import {Typography, Container, Paper, Stack, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

import '../styles/homePage.css'
import { useUsuario } from '../hooks/useUsuario';




const Home = () => {
    const { usuario, token, logout } = useUsuario();
  return (
    <Container maxWidth="md" sx={{ py: 1 }}>
      <Paper className='contenido-home-fullscream' elevation={3} sx={{ p: 4, bgcolor: 'background.paper' }}>
        <Typography variant="h5" gutterBottom textAlign={'center'}>
          VaultCrypt 🔐
        </Typography>

        <Typography variant="h6" gutterBottom>
          ¿Qué es esto?
        </Typography>
        <Typography paragraph fontSize={12} >
          VaultCrypt es una aplicación web que permite cifrar y descifrar información sensible de forma rápida, segura y accesible. Está diseñada con un enfoque en la experiencia de usuario, la escalabilidad del código y la claridad técnica.
        </Typography>

        <Typography variant="h6" gutterBottom>
          ¿Qué problema resuelve?
        </Typography>
        <Typography paragraph fontSize={12}>
          En un mundo donde la privacidad digital es cada vez más frágil, VaultCrypt ofrece una solución simple pero robusta para proteger datos personales o profesionales. Ideal para desarrolladores, periodistas, activistas o cualquier persona que necesite compartir información cifrada sin complicaciones.
        </Typography>

        <Typography variant="h6" gutterBottom>
          ¿Por qué lo usaría?
        </Typography>
        <Typography paragraph fontSize={12}>
          Porque combina seguridad real con una interfaz intuitiva. Porque está construido con tecnologías modernas (React, MUI, Zod, RHF) y buenas prácticas de desarrollo. Y porque detrás hay una mente obsesionada con la coherencia, la mejora continua y la comunicación clara: vos.
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 1,     justifyContent: 'center',alignItems: 'center' }}>
          <Button
            variant='outlined'
            color="primary"
            component={RouterLink}
            to="/login"
          >
            Ingresar ahora
          </Button>
          <Button
          
            variant='outlined'
            color="primary"
            component={RouterLink}
            to="/encrypt"
          >
            Probar ahora
          </Button>
        </Stack>


      </Paper>
      
      <Paper className='contenido-home-smallscream' elevation={3} sx={{ p: 4, bgcolor: 'background.paper' }}>
        <Typography variant="h5" gutterBottom textAlign={'center'}>
          VaultCrypt 🔐
        </Typography>
        
        <Typography paragraph fontSize={18}>
          Esta aplicacion responsiva esta a su disposicon para la gestion de cuentas y credenciales de sus servicios cotidianos
        </Typography>
        <details>
          <summary>¿Qué es esto?</summary>
          <p>VaultCrypt es una aplicación web que permite cifrar y descifrar información sensible de forma rápida, segura y accesible. Está diseñada con un enfoque en la experiencia de usuario, la escalabilidad del código y la claridad técnica.</p>
        </details>
        <details>  
          <summary>
            ¿Qué problema resuelve?
          </summary>
          <p>En un mundo donde la privacidad digital es cada vez más frágil, VaultCrypt ofrece una solución simple pero robusta para proteger datos personales o profesionales. Ideal para desarrolladores, periodistas, activistas o cualquier persona que necesite compartir información cifrada sin complicaciones.</p>
        </details>
        <details>
          <summary>
            ¿Por qué lo usaría?
          </summary>
          <p>Porque combina seguridad real con una interfaz intuitiva. Porque está construido con tecnologías modernas (React, MUI, Zod, RHF) y buenas prácticas de desarrollo. Y porque detrás hay una mente obsesionada con la coherencia, la mejora continua y la comunicación clara: vos.</p>
        </details>
        <Stack direction="row" spacing={2} sx={{ mt: 1,     justifyContent: 'center',alignItems: 'center' }}>
          <Button
            variant='outlined'
            color="primary"
            component={RouterLink}
            to="/login"
          >
            Ingresar ahora
          </Button>
          <Button
          
            variant='outlined'
            color="primary"
            component={RouterLink}
            to="/encrypt"
          >
            Probar ahora
          </Button>
        </Stack>


      </Paper>
      <div>Usuario actual: {usuario?.name}</div>
    </Container>
  )
} 

export default Home