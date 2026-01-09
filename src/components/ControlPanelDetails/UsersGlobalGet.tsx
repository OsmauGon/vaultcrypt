import { useState } from "react";
import type { Usuario } from "../../pages/ControlPanles";


type Props = {
    endpoint: string;
}
/*type Peticion = {
  users: Usuario[]
}
  */

const UsersGlobalGet = (props: Props) => {
  const [usuarios,setUsuarios] = useState<Usuario[]>()
  const handleSearch = async (cadena :string) =>{
    try {
      const response = await fetch(cadena)
      const data = await response.json()
      console.log(data)
      setUsuarios(data.users)
    } catch (error) {
      console.error("error en usersgetglobal: ",error)
    }

  }
  return (
    <details >
        <summary>Obtener todos los usuarios</summary>
        <div className="interior">
        {(usuarios && usuarios.length > 1) ? usuarios.map(user =>(<div>Usuario {user.id}: {user.name}</div>)) //usuarios.map(user =>(JSON.stringify(user))) 
                                                        : <button onClick={()=> {handleSearch(props.endpoint)}}
                                                        >Solicitar</button>}
        </div>
    </details>
  )
}

export default UsersGlobalGet