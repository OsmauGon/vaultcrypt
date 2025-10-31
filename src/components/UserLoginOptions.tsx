
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

type Props = {
    handleLogout: ()=>void
}
export const UserLoginOptions = ({handleLogout}: Props) => {
  return (
    <>
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
