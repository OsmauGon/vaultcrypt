// src/contextos/UsuarioProvider.tsx
import { useState, useEffect } from 'react';
import { UsuarioContext } from './UsuarioContext';
import type {UsuarioLogueado} from './UsuarioContext'
/*
const defaultUser: UsuarioLogueado = {
  id: 123456789,
  name: 'Juan',
  emailPrincipal: 'Juan1@yahoo.com',
  password: '123456',
  secretWord: 'secreto',
  role: 'admin',
  emailList: ['Juan1@yahoo.com', 'Juan2@yahoo.com', 'Juan3@yahoo.com'],
  };
  */

export const UsuarioProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<UsuarioLogueado | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const refreshUsuario = async () => {
  if (!token) return;

  try {
    const res = await fetch('https://maurix-bedmpvcc.vercel.app/api/usuario', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!res.ok) {
      console.warn("POR FAVOR INICIE SESION")
      /*
      console.warn('Fallo el fetch, usando defaultUser');
      setUsuario(defaultUser);
      return;
      */
    }

    const data = await res.json();
    setUsuario(data.datosDEusurario);
  
  } catch (error) {
    console.error('Error al refrescar usuario:', error);
    //setUsuario(defaultUser); // 👈 Fallback también en errores de red
  }
};

  const logout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem('vc-token');
    /* use antes SE PUEDE BORRAR 
    localStorage.removeItem('vaultcrypt-token');
    sessionStorage.removeItem('vc-visit');
     */
  };


useEffect(() => {
  /*
  console.log("colocando token")
  localStorage.setItem("vc-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbFByaW5jaXBhbCI6Im1hcmlhbmFAZXNwb3NpdG8uY29tIiwiaWF0IjoxNzY1MTQ5MDUwLCJleHAiOjE3NjUxNTI2NTB9.PxOYdYMpEQbAFM9-BYLftW2-mQc-iVoyfzkKk6b3MuM")
  */
  /*
  const visit = localStorage.getItem('vc-visit')
  if(!visit) localStorage.setItem('vc-visit','standby')
  */
  const storedToken = localStorage.getItem('vc-token');
  if (storedToken) {
    setToken(storedToken); // Esto dispara el otro useEffect
  } else {
    setUsuario(null)
    console.log("no hay token")
    //setUsuario(defaultUser); // 👈 Si no hay token, también usamos defaultUser
  }
  /*
  const visitUser = sessionStorage.getItem('vc-visit')
  if(visitUser && !storedToken){
    setUsuario(JSON.parse(visitUser))
  }
  */
}, []);

useEffect(() => {
  if (token) {
    localStorage.setItem('vc-token', token);
    refreshUsuario();
  }
  
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [token]);
  return (
    <UsuarioContext.Provider value={{ usuario, token, setUsuario, setToken, refreshUsuario, logout }}>
      {children}
    </UsuarioContext.Provider>
  );
};