
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

import LockIcon from '@mui/icons-material/Lock'
import HistoryIcon from '@mui/icons-material/History'
import SearchIcon from '@mui/icons-material/Search';

type Props = {
    handleLogout: ()=>void
}
export const UserLoginOptions = ({handleLogout}: Props) => {
  return (
    <>
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
        {<Link to={'/edit'}>
                    <ListItem disablePadding >
                        <ListItemButton>
                            <ListItemIcon >
                                <ManageAccountsIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Editar" />
                        </ListItemButton>
                    </ListItem>
        </Link> }
        <Link to={'/'}>
                    <ListItem disablePadding onClick={ ()=> handleLogout() }>
                        <ListItemButton>
                            <ListItemIcon >
                                <LogoutIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Salir" />
                        </ListItemButton>
                    </ListItem>
        </Link>
    </>
  )
}
