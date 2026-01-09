import { useState } from "react";
import type { Solicitud, Usuario } from "../../pages/ControlPanles";


type Props = {
    endpoint: string;
    token?: string;
}
type Peticion = {
  user: Usuario
}

 

const UsersIndividualGet2 = (props: Props) => {
    const [numero,setNumero] = useState<number>(-1)
    const [usuario,setUsuario] = useState<Peticion>()
    const cuerpo :Solicitud = {
        headers: {
        "Content-Type": "application/json",
        "authorization": `${props.token}`
        },
        method: "GET",

    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumero(Number(e.currentTarget.value));
    };
    const handleSearch = async (cadena: string)=>{
      const url = cadena + numero
      try {
        const response = await fetch(url,cuerpo)
        const data = await response.json();
        console.log(data)
        setUsuario(data)
      } catch (error) {
        console.error("ocurrio un error en usesindividualget2: ",error)
      }
    }

  return (
    <details >
        <summary>Obtener un usuario</summary>
        <div className="interior">
        {
          (usuario && usuario.user) ? JSON.stringify(usuario.user) 
                                    : <>
                                      <input type="number" placeholder="Numero" onChange={(e)=>{handleChange(e)}} />
                                      <button onClick={()=>handleSearch(props.endpoint)}>Solicitar</button>
                                      </>
        }
        </div>
    </details>
  )
}

export default UsersIndividualGet2