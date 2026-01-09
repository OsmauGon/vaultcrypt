// src/contextos/UsuarioProvider.tsx
import { useState, useEffect } from 'react';
import { UsuarioContext } from './UsuarioContext';
import type {UsuarioLogueado} from './UsuarioContext'
import { useNavigate } from 'react-router-dom';
export const UsuarioProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState<UsuarioLogueado | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const refreshUsuario = async () => {
  if (!token) return;
  try {
    const res = await fetch("https://maurix-bedmpvcc.vercel.app/api/usuario", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      // Aquí lees el mensaje del backend
      const errorData = await res.json().catch(() => null); // por si no es JSON
      console.error("Error del backend:", errorData?.error.message || "POR FAVOR INICIE SESION");
      setUsuario(null);
      return; // 👈 importante: salir para no seguir con setUsuario(data)
    }

    const data = await res.json();
    setUsuario(data.datosDEusurario);

  } catch (error) {
    console.error("Error en la red:", error);
    setUsuario(null); // fallback en errores de red
  }
};

  const logout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem('vc-token');
    navigate('/')
  };


useEffect(() => {//esto verifica si hay un toke y si lo hay dispara el siguiente useEffect
  
  const storedToken = localStorage.getItem('vc-token');
  if (storedToken) {
    setToken(storedToken); // Esto dispara el otro useEffect
  } else {
    setUsuario(null)
    //setUsuario(defaultUser); // 👈 Si no hay token, también usamos defaultUser
  }
  }, []);

useEffect(() => {//esto pone al token en el localstarage y refresca al usuario
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