import { useState } from "react";
import type { Account, Solicitud } from "../../pages/ControlPanles";


type Props = {
    endpoint: string;
    token?: string;
}
type Peticion = {
  account: Account
  message: string;
}
 
const AccountsDelete = (props: Props) => {
    const [numero,setNumero] = useState<number>(-1)
    const [usuario,setUsuario] = useState<Peticion>()
    const cuerpo :Solicitud = {
        headers: {
        "Content-Type": "application/json",
        "authorization": `${props.token}`
        },
        method: "GET",

    }
    const cuerpo2 :Solicitud = {
        headers: {
        "Content-Type": "application/json",
        "authorization": `${props.token}`
        },
        method: "DELETE",

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
    const handleErase = async (cadena: string)=>{
      const url = cadena + numero
      try {
        const response = await fetch(url,cuerpo2)
        const data = await response.json();
        console.log(data)
        setUsuario(data)
      } catch (error) {
        console.error("ocurrio un error en usesindividualget2: ",error)
      }
    }

  return (
    <details >
        <summary>Eliminar una Cuenta</summary>
        <div className="interior">
        {
          (usuario && usuario.account) ? <><div>{`¿Desea eliminar la cuenta ${usuario.account.id} del usuario ${usuario.account.userId}?`}</div> 
                                        <button onClick={()=> handleErase(props.endpoint)}>borrar</button>
                                      </> 
                                    : <>
                                      <input type="number" placeholder="Numero" onChange={(e)=>{handleChange(e)}} />
                                      <button onClick={()=>handleSearch(props.endpoint)}>Solicitar</button>
                                      </>
        }
        </div>
    </details>
  )
}
export default AccountsDelete