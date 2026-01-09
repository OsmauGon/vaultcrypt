import { useState } from "react";
import type { Solicitud, Account } from "../../pages/ControlPanles";


type Props = {
    endpoint: string;
    token?: string;
}
type Peticion = {
  account: Account
}

 

const AcountsIndividualGet = (props: Props) => {
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
        <summary>Obtener una cuenta</summary>
        <div className="interior">
        {
          (usuario && usuario.account) ? JSON.stringify(usuario.account) 
                                    : <>
                                      <input type="number" placeholder="Numero" onChange={(e)=>{handleChange(e)}} />
                                      <button onClick={()=>handleSearch(props.endpoint)}>Solicitar</button>
                                      </>
        }
        </div>
    </details>
  )
}

export default AcountsIndividualGet