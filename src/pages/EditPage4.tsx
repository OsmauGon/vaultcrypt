import { useEffect, useState } from 'react'
import { EditForm } from '../components/EditForm'


 export type UserCredentials = {
  nombre: string;
  emailPrincipal: string;
  contraseña: string;
  palabraSecreta: string;
  rol?: 'user' | 'admin';
  emailList: string[];
};

const EditPage4 = () => {
  const [initialCredentials, setInitialCredentials] = useState<UserCredentials | null>(null);
  

  useEffect(() => {
    const user: UserCredentials = {
  nombre: 'Juan',
  emailPrincipal: 'Juan1@yahoo.com',
  contraseña: '123456',
  palabraSecreta: 'secreto',
  rol: 'admin',
  emailList: ['Juan1@yahoo.com', 'Juan2@yahoo.com', 'Juan3@yahoo.com'],
  };
    if (user) {
      // Simulamos fetch de credenciales
      setInitialCredentials({
        nombre: user.nombre,
        emailPrincipal: user.emailPrincipal,
        contraseña: user.contraseña, // Nunca se muestra la contraseña actual
        palabraSecreta: user.palabraSecreta,
        rol: user.rol,
        emailList: user.emailList,
      });
    }
  }, []);

  if (!initialCredentials) return <div>No hay usuario logueado</div>;

  return <EditForm initialCredentials={initialCredentials} />;
};

export default EditPage4