
import { Link } from 'react-router-dom';
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import HistoryIcon from '@mui/icons-material/History'
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';

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
            {usuario ? <li><p>{'🙂Hola ' + usuario.name }</p></li>
                :   <Link to={'/login'}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <LoginIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Ingresar" />
                        </ListItemButton>
                    </ListItem>
                </Link>
            }
            


            <Link to={'/search'}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <SearchIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Buscar" />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to={'/encrypt'}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <LockIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Encriptar" />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to={'/historial'}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <HistoryIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Historial" />
                    </ListItemButton>
                </ListItem>
            </Link>

            
            {!usuario ? ''
                    : <UserLoginOptions handleLogout={handleLogout}/>
            }
        </List>
  )
}