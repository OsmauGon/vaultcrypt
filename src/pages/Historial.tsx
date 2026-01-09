
import { Box, Typography } from '@mui/material'
import { RequireAuthNotice } from '../components/RequireAuthNotice'
import { AccountCard } from '../components/AccountCard'
import { useUsuario } from '../hooks/useUsuario'
import { useEffect, useState } from 'react'


import '../styles/AccountCard.css'
//import { accountSimulator } from '../../public/accountSimulator2'


export type Cuenta = {
    id?: number;
    userId?: number;
    userName: string;
    userEmail: string;
    servicePassword: string;
    serviceName: string;
    serviceUrl: string;
    serviceType?: 'Red Social'|"Correo Electronico"|"Busqueda laboral"|'Nube de descargas'|"Programacion/Desarrollo"|"Aplicacion de dispositivo"|"Billetera/inversiones"|"Otros",
    serviceDescription: string;
    creadoEn: string;
}

export const Historial = () => {
    const {usuario} = useUsuario()
    const [cuentas,setCuentas] = useState<Cuenta[] | null>(null)
    useEffect(()=>{
      if(!usuario || !localStorage.getItem('vc-token')) return
      const API_URL = "https://maurix-bedmpvcc.vercel.app/api/cuentas?idDueño=" + usuario.id; 
      const token = localStorage.getItem("vc-token"); // normalmente lo obtienes al hacer login

      async function getData() {
        try {
          const response = await fetch(API_URL, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`, // el token va aquí
            },
          });

          if (!response.ok && response.status != 404) {
            throw new Error(`Error HTTP: ${response.status}`);
          }

          const data = await response.json();
          setCuentas(data);
        } catch (error) {
          console.error("Error en la solicitud:", error);
        }
      }

      // Llamada a la función
      getData();

      },[usuario])

  return (
         <> 
            {usuario ? <>
                            <Typography variant="h4" gutterBottom>Historial de {usuario.name}</Typography>
                            <Typography >Acceda a las ultimas cuentas creadas</Typography>
                            {
                              !(cuentas && cuentas.length > 1) ? <p>No se han encontrado cuentas relacionadas a este usuario</p>
                                        : <Box className="account-card-container" sx={{  mx: 'auto', mt: 2 }}>
                                            {cuentas.slice(-4,cuentas.length).map((acc: Cuenta) => (
                                              <AccountCard key={acc.id} account={acc} cipher={usuario.secretWord}/>
                                            ))}
                                          </Box>

                              }
                        </>
                    : <RequireAuthNotice />
                    }
            </>
      )
}

