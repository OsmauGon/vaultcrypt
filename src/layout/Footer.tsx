import { Box, Typography } from '@mui/material'

const Footer = () => (
  <Box
    component="footer"
    sx={{
      py: 1,
      textAlign: 'center',
      bgcolor: 'primary.main', // mismo color que el Header
      color: 'background.default', // texto claro sobre fondo oscuro
    }}
  >
    <Typography variant="body2">
      © {new Date().getFullYear()} VaultCrypt. All rights reserved.
    </Typography>
  </Box>
)

export default Footer
