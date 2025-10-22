import { Box, Button, Typography } from '@mui/material'
import { LockClockOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export const RequireAuthNotice =()=>{
    const navigate = useNavigate();

    return (
            <Box
                display='flex'
                flexDirection='column'      
                alignItems="center"
                justifyContent="center"
                height="100%"
                textAlign="center"
                padding={4}
                sx={{
                    animation: 'fadeIn 0.6s ease-in-out',
                    '@keyframes fadeIn': {
                        from: { opacity: 0 },
                        to: { opacity: 1 },
                        },
                }}
            >
                <LockClockOutlined sx={{ fontSize: 60, color: 'primary.main', mb:2}} />
                <Typography variant='h5' mb={3}>Necesitas iniciar sesion para esta seccion</Typography>
                <Button variant='contained' onClick={()=> navigate('/login')}>Ir a ingresar</Button>
            </Box>
    )
}