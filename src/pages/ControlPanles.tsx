import { useEffect, useState } from 'react'
import '../styles/control-panel.css'
import UsersGlobalGet from '../components/ControlPanelDetails/UsersGlobalGet'
import UsersIndividualGet2 from '../components/ControlPanelDetails/UserIndividualGet';
import UsersPostRegister from '../components/ControlPanelDetails/UsersPostRegister';
import UsersPostLogin from '../components/ControlPanelDetails/UsersPostLogin';
import UsersDelete from '../components/ControlPanelDetails/UsersDelete';
import UsersPut from '../components/ControlPanelDetails/UsersPut';
import AccountsGlobalGet from '../components/ControlPanelDetails/AccountsGlobalGet';
import AcountsIndividualGet from '../components/ControlPanelDetails/AccountsIndividualGet';
import AccountsDelete from '../components/ControlPanelDetails/AccountsDelete';
import { useUsuario } from '../hooks/useUsuario';
import { useNavigate } from 'react-router-dom';


type accionesYendpoints = {
    token?:string;
    acciones?: string[];
    endpoints?: string[];
    cuerpos?: object
}
export type Solicitud = {
  method: "POST" | "GET" | "PUT" | "DELETE" // or 'PUT'
  body?:  string; //JSON.stringify(cuerpo), // data can be `string` or {object}!
  headers: {"Content-Type": "application/json", "authorization": string}
}
export type Usuario = {
  id: string;
  name: string;
  emailPrincipal: string;
  emailList: string[];
  role: "admin" | "user"
}
export type Account = {
    id: number,
    userId: number,
    userName: string,
    userEmail: string,
    serviceName: string,
    serviceUrl: string,
    servicePassword: string,
    serviceType: string,
    serviceDescription: string,
    creadoEn: string
}
const acciones = [
    "Get de usuarios global",
    "Get de usuarios individual",
    "Post de usuarios register",
    "Post de usuarios login",
    "Put de usuarios",
    "Delete de usuarios",
    "Get de cuentas global",
    "Get de cuentas indivudual",
    "Delete de cuenta",
]

const ControlPanles = () => {
  const navigate = useNavigate()
  const {usuario} = useUsuario()
  const [endpoints, setEndpoints] = useState<accionesYendpoints>({})

    useEffect(()=>{
    if(!usuario  || usuario?.role !== "admin") {
        alert("No tiene autorizacion pasa estar aqui")
        navigate('/')
      }
      async function getData() {
        try {
          const response = await fetch("/public/adminonly.txt");

          if (!response.ok && response.status != 404) {
            throw new Error(`Error HTTP: ${response.status}`);
          }

          const data = await response.json();
          setEndpoints({
            acciones,
            endpoints: data.endpoints
          })
          //setCuentas(data);
        } catch (error) {
          console.error("Error en la solicitud:", error);
        }
      }

      // Llamada a la función
      getData();
      //console.log(endpoints)
    },[])

   








  return (
    <>
    <div className='control-panel-styles'>
    <h1>Panel de Control</h1>
    {(endpoints.endpoints && endpoints.endpoints[0]) ? <UsersGlobalGet endpoint={endpoints.endpoints[0]}></UsersGlobalGet> : <div>No hay nada para mostrar</div>}
    {(endpoints.endpoints && endpoints.endpoints[1]) ? <UsersIndividualGet2 token={endpoints.token} endpoint={endpoints.endpoints[1]}></UsersIndividualGet2> : <div>No hay nada para mostrar</div>}
    {(endpoints.endpoints && endpoints.endpoints[2]) ? <UsersPostRegister token={endpoints.token} endpoint={endpoints.endpoints[2]}></UsersPostRegister> : <div>No hay nada para mostrar</div>}
    {(endpoints.endpoints && endpoints.endpoints[3]) ? <UsersPostLogin token={endpoints.token} endpoint={endpoints.endpoints[3]}></UsersPostLogin> : <div>No hay nada para mostrar</div>}
    {(endpoints.endpoints && endpoints.endpoints[4]) ? <UsersPut token={endpoints.token} endpoint={endpoints.endpoints[4]}></UsersPut> : <div>No hay nada para mostrar</div>}
    {(endpoints.endpoints && endpoints.endpoints[5]) ? <UsersDelete token={endpoints.token} endpoint={endpoints.endpoints[5]}></UsersDelete> : <div>No hay nada para mostrar</div>}
    
    {(endpoints.endpoints && endpoints.endpoints[6]) ? <AccountsGlobalGet token={endpoints.token} endpoint={endpoints.endpoints[6]}></AccountsGlobalGet> : <div>No hay nada para mostrar</div>}
    {(endpoints.endpoints && endpoints.endpoints[7]) ? <AcountsIndividualGet token={endpoints.token} endpoint={endpoints.endpoints[7]}></AcountsIndividualGet> : <div>No hay nada para mostrar</div>}
    {(endpoints.endpoints && endpoints.endpoints[8]) ? <AccountsDelete token={endpoints.token} endpoint={endpoints.endpoints[8]}></AccountsDelete> : <div>No hay nada para mostrar</div>}
    </div>

    </>
  )
}

export default ControlPanles











