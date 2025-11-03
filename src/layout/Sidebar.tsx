import '../styles/Sidebar.css'

import {Drawer} from '@mui/material'
import { EnlacesPaginas } from '../components/EnlacesPaginas';


export const Sidebar = ()=>{
    
    return (
       
    <Drawer variant='permanent'  open={true} className='sidebar' >
        <EnlacesPaginas></EnlacesPaginas>
    </Drawer>
    )

}