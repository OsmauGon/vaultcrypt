
import { Box, Typography } from '@mui/material'
import { RequireAuthNotice } from '../components/RequireAuthNotice'
import { AccountCard } from '../components/AccountCard'
import { useUsuario } from '../hooks/useUsuario'
import { useEffect, useState } from 'react'


import '../styles/AccountCard.css'
import { accountSimulator } from '../../public/accountSimulator2'

/* 
export type Cuenta = {
    id?: number;
    userId?: number;
    fecha: string;
    serviceName: string;
    serviceUrl: string;
    userName: string;
    userEmail: string;
    userPassword: string;
    accountType?: 'Red Social'|"Correo Electronico"|"Busqueda laboral"|'Nube de descargas'|"Programacion/Desarrollo"|"Aplicacion de dispositivo"|"Billetera/inversiones"|"Otros",
    accountDescription: string;
} */
export type Cuenta = {
    id?: number;
    userId?: number;
    userName: string;
    userEmail: string;
    userPassword: string;
    serviceName: string;
    serviceUrl: string;
    serviceType?: 'Red Social'|"Correo Electronico"|"Busqueda laboral"|'Nube de descargas'|"Programacion/Desarrollo"|"Aplicacion de dispositivo"|"Billetera/inversiones"|"Otros",
    serviceDescription: string;
    created: string;
}

export const Historial = () => {
    const {usuario} = useUsuario()
    const [cuentas,setCuentas] = useState<Cuenta[] | null>(null)
    useEffect(()=>{
      const leerArchivo = async ()=> {
            if (!usuario) return //esta es una mediadi de seguridad pero hay que mejorarla. Es importante que no se hagan solicitudes a menos que el usuario correcto este logueado
            try {
                // Espera la respuesta de la petición
                const respuesta = await fetch('../../public/accounts.txt');

                // Verifica si la respuesta fue exitosa
                if (!respuesta.ok) {
                    console.log("Algo salio mal. revisa a donde hace la solicitu el fetch")
                    throw new Error(`Error HTTP: ${respuesta.status}`);
                }

                // Convierte el contenido a texto
                  const contenido = await respuesta.text();
  
                  /* setCuentas(JSON.parse(contenido)) */ //descomentar cuando el backend este listo
                  
                  const listaObtenida =  JSON.parse(contenido)// comentar cuando el backend este listo
                  setCuentas(accountSimulator(usuario, listaObtenida))// comentar cuando el backend este listo
            } catch (error) {
                console.error("Ocurrió un error al leer el archivo:", error);
            }
        }

        // Llamar a la función
        leerArchivo();
    },[usuario])

  return (
         <> 
            {usuario ? <>
                            <Typography variant="h4" gutterBottom>Historial de {usuario.name}</Typography>
                            <Typography >Acceda a las ultimas cuentas creadas</Typography>
                            {
                              !(cuentas && cuentas.length > 1) ? <p>Cargando cuentas...</p>
                                        : <Box className="account-card-container" sx={{  mx: 'auto', mt: 2 }}>
                                            {cuentas.slice(-4,cuentas.length).map((acc: Cuenta) => (
                                              <AccountCard key={acc.id} account={acc} />
                                            ))}
                                          </Box>

                              }
                        </>
                    : <RequireAuthNotice />
                    }
            </>
      )
}

