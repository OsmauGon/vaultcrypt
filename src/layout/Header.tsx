import { AppBar, Toolbar, Typography, useTheme, Button, Box } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useUsuario } from '../hooks/useUsuario';
import '../styles/header.css'


const Header = () => {
  const theme = useTheme()
  const { usuario, logout } = useUsuario();
  const navigate = useNavigate()

  const navItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Buscar', path: '/search' },
    { label: 'Cifrar', path: '/encrypt' },
  ]

  
  const handleLogout =()=>{
    logout()
    navigate('/')
  }

  return (
    <AppBar
      className='vc-header'
      position="static"
      sx={{
        bgcolor: theme.palette.primary.main,
        color: theme.palette.background.default,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {(usuario && usuario.name) ? <Typography variant="h6" component="div" className='saludo'>
                            Hola {usuario.name} 👋
                          </Typography>

                        : <Typography variant="h6" component="div" className='saludo'>
                          VaultCrypt 🔐
                        </Typography>
        }
        <Box>
          {navItems.map(({ label, path }) => (
            <Button
              className='header-item'
              key={path}
              component={RouterLink}
              to={path}
              sx={{ color: theme.palette.background.default }}
            >
              {label}
            </Button>
          ))}
          
            {(usuario && usuario.name) ? <>
                          <Button
                            className='header-item'
                            component={RouterLink}
                            to='/historial'
                            sx={{ color: theme.palette.background.default }}
                          >
                            Historial
                          </Button>
                          <Button
                            className='header-item'
                            component={RouterLink}
                            to='/edit'
                            sx={{ color: theme.palette.background.default }}
                          >
                            Editar
                          </Button>
                          <Button
                            className='header-item'
                            onClick={handleLogout}
                            sx={{ color: theme.palette.background.default }}
                          >
                            Salir
                          </Button>
                          </>

                        : <Button
                            className='header-item'
                            component={RouterLink}
                            to='/login'
                            sx={{ color: theme.palette.background.default }}
                          >
                            Login
                          </Button>
        }
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header