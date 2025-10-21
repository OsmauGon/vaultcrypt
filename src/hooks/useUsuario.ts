// Este es el hook para poder comprartir el contexto global de usuario en todas la page, es decir que es lo que voy a importtar


import { useContext } from 'react';
import { UsuarioContext } from '../contextos/UsuarioContext'

export const useUsuario = () => {
  const context = useContext(UsuarioContext);
  if (!context) throw new Error('useUsuario debe usarse dentro de UsuarioProvider');
  return context;
};