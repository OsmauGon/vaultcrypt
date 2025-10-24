import { useEffect, useState } from 'react'
import { EditForm } from '../components/EditForm'
import { useUsuario } from '../hooks/useUsuario';


 export type UserCredentials = {
  name: string;
  emailPrincipal: string;
  password: string;
  secretWord: string;
  role?: 'user' | 'admin' | 'visit';
  emailList: string[];
};

const EditPage4 = () => {
  const [initialCredentials, setInitialCredentials] = useState<UserCredentials | null>(null);
  const {usuario} = useUsuario()

  useEffect(() => {
    /*const user: UserCredentials = {
    name: 'Juan',
    emailPrincipal: 'Juan1@yahoo.com',
    password: '123456',
    secretWord: 'secreto',
    role: 'admin',
    emailList: ['Juan1@yahoo.com', 'Juan2@yahoo.com', 'Juan3@yahoo.com'],
    };*/
    if (usuario) {
      // Simulamos fetch de credenciales
      setInitialCredentials({
        name: usuario.name,
        emailPrincipal: usuario.emailPrincipal,
        password: usuario.password, // Nunca se muestra la contraseña actual
        secretWord: usuario.secretWord,
        role: usuario.role,
        emailList: usuario.emailList,
      });
    }
  }, [usuario]);

  if (!initialCredentials) return <div>No hay usuario logueado</div>;

  return <EditForm initialCredentials={initialCredentials} />;
};

export default EditPage4