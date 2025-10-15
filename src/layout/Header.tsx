import { AppBar, Toolbar, Typography, useTheme, Button, Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const Header = () => {
  const theme = useTheme()

  const navItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Buscar', path: '/search' },
    { label: 'Historial', path: '/historial' },
    { label: 'Cifrar', path: '/encrypt' },
    { label: 'Login', path: '/login' },
  ]

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: theme.palette.primary.main,
        color: theme.palette.background.default,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          VaultCrypt 🔐
        </Typography>
        <Box>
          {navItems.map(({ label, path }) => (
            <Button
              key={path}
              component={RouterLink}
              to={path}
              sx={{ color: theme.palette.background.default }}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header