
import { Box, Typography } from '@mui/material'
import { RequireAuthNotice } from '../components/RequireAuthNotice'
import { useEffect, useMemo, useState } from 'react'
import { SearchBar } from '../components/SearchBar'
import { AccountCard } from '../components/AccountCard'
import { FilterBar } from '../components/FiltreBar'
import { useUsuario } from '../hooks/useUsuario'
import type { Cuenta } from './Historial'


import '../styles/AccountCard.css'

export const Search = () => {
  
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

          if (!response.ok) {
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
      results = results.filter(acc => acc.serviceType === selectedType);
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
                                                              <AccountCard key={i} account={acc} cipher={usuario.secretWord} />
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


