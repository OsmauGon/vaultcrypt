import { useState } from "react";
import type { Solicitud, Usuario } from "../../pages/ControlPanles";


type Props = {
    endpoint: string;
    token?: string;
}
type Peticion = {
  user: Usuario
}


 

const UsersPostRegister = (props: Props) => {
    const [usuario,setUsuario] = useState<Peticion>()
    const cuerpo :Solicitud = {
    headers: {
    "Content-Type": "application/json",
    "authorization": `${props.token}`
    },
    method: "POST",
    }

    const [nombre,setNombre] = useState<string>("")
    const [emalil,setEmail] = useState<string>("")
    const [clave,setClave] = useState<string>("")
    const [palabra,setPalabra] = useState<string>("")
    const [rol,setRol] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, entrada :string) => {
    if(entrada === "email") setEmail(e.currentTarget.value)
        if(entrada === "clave") setClave(e.currentTarget.value)
            if(entrada === "palabra") setPalabra(e.currentTarget.value)
                if(entrada === "nombre") setNombre(e.currentTarget.value)
                if(entrada === "rol") setRol(!rol)
    };
    const handleSend = async (cadena :string)=>{
      const url = cadena
      const cuerpo2 = JSON.stringify({
        name: nombre,
        emailPrincipal: emalil,
        password: clave,
        secretWord: palabra,
        role: rol ? "admin" : "user"
    })
      const cuerpo3 = {...cuerpo,body: cuerpo2}
      try {
        const response = await fetch(url,cuerpo3)
        const data = await response.json();
        console.log(data)
        setUsuario(data)
      } catch (error) {
        console.error("ocurrio un error en userspostregister: ",error)
      } 
      console.log({
        name: nombre,
        emailPrincipal: emalil,
        password: clave,
        secretWord: palabra,
        role: rol ? "admin" : "user"
    })
    }

  return (
    <details >
        <summary>Registrar un usuario</summary>
        <div className="interior">
        {
          (usuario && usuario.user) ? JSON.stringify(usuario.user) 
                                    : <>
                                      <input type="text" placeholder="Nombre" onChange={(e)=>{handleChange(e,"nombre")}} />
                                      <input type="text" placeholder="Email" onChange={(e)=>{handleChange(e,"email")}} />
                                      <input type="password" placeholder="Clave" onChange={(e)=>{handleChange(e,"clave")}} />
                                      <input type="password" placeholder="Palabra Secreta" onChange={(e)=>{handleChange(e,"palabra")}} />
                                      <div>                                      
                                        <label htmlFor="">Es admin</label>
                                        <input type="checkbox" placeholder="rol" onChange={(e)=>{handleChange(e,"rol")}} />
                                        </div>

                                      
                                      <button onClick={()=> handleSend(props.endpoint)}>Registrar</button>
                                      </>
        }
        </div>
    </details>
  )
}

export default UsersPostRegister