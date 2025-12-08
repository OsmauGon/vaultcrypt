import { useEffect, useState } from 'react'
import { EditForm } from '../components/EditForm'
import { useUsuario } from '../hooks/useUsuario';


 export type UserCredentials = {
  name: string;
  emailPrincipal: string;
  password: string;
  emailList: string[];
};

const EditPage4 = () => {
  const [initialCredentials, setInitialCredentials] = useState<UserCredentials | null>(null);
  const {usuario} = useUsuario()

  useEffect(() => {
    if (usuario) {
      // Simulamos fetch de credenciales
      setInitialCredentials({
        name: usuario.name,
        emailPrincipal: "elmismo",
        password: "lamisma",
        emailList: usuario.emailList,
      });
    }
  }, [usuario]);

  if (!initialCredentials) return <div>No hay usuario logueado</div>;

  return <EditForm initialCredentials={initialCredentials} />;
};

export default EditPage4