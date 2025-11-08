
import { Box, Typography } from '@mui/material'
import { RequireAuthNotice } from '../components/RequireAuthNotice'
import { useEffect, useMemo, useState } from 'react'
import { SearchBar } from '../components/SearchBar'
import { AccountCard } from '../components/AccountCard'
import { FilterBar } from '../components/FiltreBar'
import { useUsuario } from '../hooks/useUsuario'
import type { Cuenta } from './Historial'
import {accountSimulator} from '../../public/accountSimulator2'


import '../styles/AccountCard.css'

export const Search = () => {
  
  const {usuario} = useUsuario()
  const [cuentas,setCuentas] = useState<Cuenta[] | null>(null)
  useEffect(()=>{
        const leerArchivo = async ()=> {
          if(!usuario) return
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
      

  const [selectedName, setSelectedName] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const accountTypes: string[] = ['Red Social',"Correo Electronico","Busqueda laboral",'Nube de descargas',"Programacion/Desarrollo","Aplicacion de dispositivo","Billetera/inversiones","Otros"]
  const accountEmails: string[] = usuario ? usuario.emailList : []


  const filteredAccounts = useMemo(() => {
    let results = cuentas
    if (results && selectedName && selectedName.length > 2) {
      results = results.filter(acc => acc.serviceName.includes(selectedName));
    }
    if (results && selectedType && selectedType.length > 2) {
      results = results.filter(acc => acc.accountType === selectedType);
    }
    if (results && selectedEmail && selectedEmail.length > 2) {
      results = results.filter(acc => acc.userEmail === selectedEmail);
    }
    return results;
  }, [selectedName, selectedType, selectedEmail, cuentas]);

  return (
           <> 
              {usuario ? <div>
                          <Typography variant="h4" gutterBottom>Busqueda </Typography>
                          <Typography >Busque y acceda a la informacion de sus cuentas</Typography>
                          <SearchBar selectedName={ selectedName} setSelectedName={setSelectedName} />
                          <FilterBar selectedType={selectedType} setSelectedType={setSelectedType} 
                                    selectedEmail={selectedEmail} setSelectedEmail={setSelectedEmail} 
                                    accountTypes={accountTypes} accountEmails={accountEmails}
                                    />
                          <Box className="account-card-container" sx={{  mx: 'auto', mt: 2 }}>
                              {(filteredAccounts && filteredAccounts.length > 0) ? filteredAccounts.map((acc: Cuenta, i: number) => (
                                                              <AccountCard key={i} account={acc} />
                                                              ))
                                                            :<div>No se encontraron cuentas que coincidan con los filtros</div>
                            }
                            </Box>
                        </div>
                      : <RequireAuthNotice />
                      }
              </>
        )
}


