import { useState } from "react";
import type { Solicitud, Usuario } from "../../pages/ControlPanles";


type Props = {
    endpoint: string;
    token?:string;
}
type Peticion = {
  user: Usuario
}


 

const UsersPut = (props: Props) => {
    const [usuario,setUsuario] = useState<Peticion>()
    const [numero,setNumero] = useState<number>(-1)
    const cuerpo :Solicitud = {
    headers: {
    "Content-Type": "application/json",
    "authorization": `${props.token}`
    },
    method: "PUT",

}

    const [nombre,setNombre] = useState<string>("")
    const [emalil,setEmail] = useState<string>("")
    const [clave,setClave] = useState<string>("")
    const [rol,setRol] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, entrada :string) => {

    if(entrada === "numero") setNumero(Number(e.currentTarget.value))
    if(entrada === "email") setEmail(e.currentTarget.value)
        if(entrada === "clave") setClave(e.currentTarget.value)
                if(entrada === "nombre") setNombre(e.currentTarget.value)
                if(entrada === "rol") setRol(!rol)
    };
    const handleSend = async (cadena :string)=>{
      const url = cadena + numero
      const cuerpo2 = JSON.stringify({
        name: nombre,
        emailPrincipal: emalil,
        password: clave,
        role: rol ? "admin" : "user",
        emailList: []
    })
      const cuerpo3 = {...cuerpo,body: cuerpo2}
      try {
        const response = await fetch(url,cuerpo3)
        const data = await response.json();
        console.log(data)
        setUsuario(data)
      } catch (error) {
        console.error("ocurrio un error en usersput: ",error)
      } 
      console.log({
        name: nombre,
        emailPrincipal: emalil,
        password: clave,
        role: rol ? "admin" : "user"
    })
    }

  return (
    <details >
        <summary>Editar un usuario</summary>
        <div className="interior">
        {
          (usuario && usuario.user) ? JSON.stringify(usuario.user) 
                                    : <> 
                                    <input type="text" placeholder="Numero" onChange={(e)=>{handleChange(e,"numero")}} />
                                      <input type="text" placeholder="Nombre" onChange={(e)=>{handleChange(e,"nombre")}} />
                                      <input type="text" placeholder="Email" onChange={(e)=>{handleChange(e,"email")}} />
                                      <input type="password" placeholder="Clave" onChange={(e)=>{handleChange(e,"clave")}} />
                                      <div>                                      
                                        <label htmlFor="">Es admin</label>
                                        <input type="checkbox" placeholder="rol" onChange={(e)=>{handleChange(e,"rol")}} />
                                        </div>
                                        <div>Al enviar esto se borrara la lista de emails asignadas al usuario</div>

                                      
                                      <button onClick={()=> handleSend(props.endpoint)}>Registrar</button>
                                      </>
        }
        </div>
    </details>
  )
}

export default UsersPut