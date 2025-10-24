

import { createContext } from 'react';

export interface UsuarioLogueado {
  name: string;
  emailPrincipal: string;
  emailList: string[];
  password: string;
  role: 'user' | 'admin' | 'visit';
  secretWord: string;
}

export interface UsuarioContextType {
  usuario: UsuarioLogueado | null;
  token: string | null;
  setUsuario: (usuario: UsuarioLogueado | null) => void;
  setToken: (token: string | null) => void;
  refreshUsuario: () => Promise<void>;
  logout: () => void;
}

export const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);
