// src/contextos/UsuarioProvider.tsx
import { useState, useEffect } from 'react';
import { UsuarioContext } from './UsuarioContext';
import type {UsuarioLogueado} from './UsuarioContext'

const defaultUser: UsuarioLogueado = {
  name: 'Juan',
  emailPrincipal: 'Juan1@yahoo.com',
  password: '123456',
  secretWord: 'secreto',
  role: 'admin',
  emailList: ['Juan1@yahoo.com', 'Juan2@yahoo.com', 'Juan3@yahoo.com'],
  };

export const UsuarioProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<UsuarioLogueado | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const refreshUsuario = async () => {
  if (!token) return;

  try {
    const res = await fetch('/api/user/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.warn('Fallo el fetch, usando defaultUser');
      setUsuario(defaultUser);
      return;
    }

    const data = await res.json();

    // Validación extra por si el backend responde pero sin datos útiles
    if (!data || !data.emailPrincipal) {
      console.warn('Datos inválidos, usando defaultUser');
      setUsuario(defaultUser);
      return;
    }

    setUsuario(data);
  } catch (error) {
    console.error('Error al refrescar usuario:', error);
    setUsuario(defaultUser); // 👈 Fallback también en errores de red
  }
};

  const logout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem('vaultcrypt-token');
    localStorage.removeItem('vc-user');
  };


useEffect(() => {
  const visit = localStorage.getItem('vc-visit')
  if(!visit) localStorage.setItem('vc-visit','standby')
  const storedToken = localStorage.getItem('vaultcrypt-token');
  if (storedToken) {
    setToken(storedToken); // Esto dispara el otro useEffect
  } else {
    setUsuario(null)
    //setUsuario(defaultUser); // 👈 Si no hay token, también usamos defaultUser
  }

  const visitUser = sessionStorage.getItem('vc-visit')
  if(visitUser && !storedToken){
    setUsuario(JSON.parse(visitUser))
  }
}, []);

useEffect(() => {
  if (token) {
    localStorage.setItem('vaultcrypt-token', token);
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