
import { Box } from '@mui/material';
import { Sidebar } from './Sidebar'

export const MainLayout = ({children}: {children: React.ReactNode}) =>{
    return (
    <Box sx={{display: 'flex'}}>
        <Sidebar/>
        <Box sx={{flexGrow: 1}}>
            <Box sx={{p: 2}}>{children}</Box>
        </Box>
    </Box>
    )
}