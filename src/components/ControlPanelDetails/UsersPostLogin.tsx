import { useState } from "react";
import type { Solicitud, Usuario } from "../../pages/ControlPanles";


type Props = {
    endpoint: string;
    token?: string;
}
type Peticion = {
  user: Usuario
}
 

const UsersPostLogin = (props: Props) => {
    const [usuario,setUsuario] = useState<Peticion>()
    const cuerpo :Solicitud = {
        headers: {
        "Content-Type": "application/json",
        "authorization": `${props.token}`
        },
        method: "POST",

    }


    
    const [emalil,setEmail] = useState<string>("")
    const [clave,setClave] = useState<string>("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, entrada :string) => {
    if(entrada === "email") setEmail(e.currentTarget.value)
        if(entrada === "clave") setClave(e.currentTarget.value)
    };
    const handleSend = async (cadena :string)=>{
      const url = cadena
      const cuerpo2 = {...cuerpo,body: JSON.stringify({emailPrincipal: emalil,password: clave})}
      try {
        const response = await fetch(url,cuerpo2)
        const data = await response.json();
        console.log(data)
        setUsuario(data)
      } catch (error) {
        console.error("ocurrio un error en userspostregister: ",error)
      } 
    console.log({emailPrincipal: emalil,password: clave})
    }

  return (
    <details >
        <summary>Loguear un usuario</summary>
        <div className="interior">
        {
          (usuario && usuario.user) ? JSON.stringify(usuario.user) 
                                    : <>
                                      <input type="text" placeholder="Email" onChange={(e)=>{handleChange(e,"email")}} />
                                      <input type="password" placeholder="Clave" onChange={(e)=>{handleChange(e,"clave")}} />
                                      
                                      <button onClick={()=>{handleSend(props.endpoint)}}>Registrar</button>
                                      </>
        }
        </div>
    </details>
  )
}

export default UsersPostLogin