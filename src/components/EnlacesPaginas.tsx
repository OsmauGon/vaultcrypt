
import { Link } from 'react-router-dom';
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home'
import ContactMailIcon from '@mui/icons-material/ContactMail';

import { useUsuario } from '../hooks/useUsuario';
import { UserLoginOptions } from './UserLoginOptions';


export const EnlacesPaginas = () => {
    const {usuario, logout} = useUsuario()
     const handleLogout =()=>{
            alert("llamamos a handleLogout")
            logout()
        }
  return (
    <List>
        {usuario && <li><p>{'🙂Hola ' + usuario.name }</p></li>}
        <Link to={'/home'}>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Inicio" />
                </ListItemButton>
            </ListItem>
        </Link>
        {usuario ? <UserLoginOptions handleLogout={handleLogout}/>
                :   <>
                    <Link to={'/login'}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <LoginIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Ingresar" />
                        </ListItemButton>
                    </ListItem>
                    </Link>
                    <Link to={'/demo'}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <LockIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Demostracion" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    </>
        }
        
        <Link to={'/contact'}>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <ContactMailIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Contacto" />
                </ListItemButton>
            </ListItem>
        </Link>
            
        </List>
  )
}