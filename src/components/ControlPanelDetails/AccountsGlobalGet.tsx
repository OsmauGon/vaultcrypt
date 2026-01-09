import { useState } from "react";
import type { Account, Solicitud } from "../../pages/ControlPanles";


type Props = {
    endpoint: string;
    token?: string;
}

const AccountsGlobalGet = (props: Props) => {
  const [usuarios,setUsuarios] = useState<Account[]>()
  const cuerpo :Solicitud = {
    headers: {
    "Content-Type": "application/json",
    "authorization": `${props.token}`
    },
    method: "GET",

}

const handleSearch = async (cadena :string) =>{
    try {
      const response = await fetch(cadena,cuerpo)
      const data = await response.json()
      console.log(data)
      setUsuarios(data.accounts)
    } catch (error) {
      console.error("error en accountsgetglobal: ",error)
    }

  }
  return (
    <details >
        <summary>Obtener todos las cuentas</summary>
        <div className="interior">
        {(usuarios && usuarios.length > 1) ? usuarios.map(user =>(<div>Cuenta numero {user.id} del usuario : {user.userId}</div>)) //usuarios.map(user =>(JSON.stringify(user))) 
                                                        : <button onClick={()=> {handleSearch(props.endpoint)}}
                                                        >Solicitar</button>}
        </div>
    </details>
  )
}

export default AccountsGlobalGet