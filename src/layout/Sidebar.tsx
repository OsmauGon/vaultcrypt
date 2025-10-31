import '../styles/Sidebar.css'

import {Drawer} from '@mui/material'
import { EnlacesPaginas } from '../components/EnlacesPaginas';


export const Sidebar = ()=>{
    
    return (
       
    <Drawer variant='permanent' sx={{width: 152, background: "red"}} open={true} id='draaawer'>
        <EnlacesPaginas></EnlacesPaginas>
    </Drawer>
    )

}