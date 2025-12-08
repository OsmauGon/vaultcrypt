import {useState, useEffect, useCallback} from 'react'

type RequestMethod = "GET" | "POST" | "PUT" 

interface UseApiOptions<TBody>{
    endpoint: string;
    method: RequestMethod;
    body?: TBody;
    headers?: Record<string,string>
}

export function useApi<TResponse,TBody = unknown>(
    options: UseApiOptions<TBody>,
    trigger: boolean = true
) {
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(!trigger) return;
    const fetchData = async ()=>{
        setLoading(true)
        try{
            const res = await fetch(options.endpoint,{
                method: options.method,
                headers: {
                    'Content-Type': "application/json",
                    ...(options.headers || {})
                },
                body: options.body ? JSON.stringify(options.body) : undefined,
            });
            if(!res.ok){
                throw new Error(`Error ${res.status}: ${res.statusText}`);
            }
            const json = (await res.json()) as TResponse
            setData(json);
        } catch(err){
            setError(err as Error)
        } finally{
            setLoading(false)
        }
    }
    fetchData()
  },[options.endpoint,options.method,options.body,options.headers,trigger])
  return {data,error,loading}
}











type Solicitud = 'login'|'register'|'edit'|'getuser'|'getaccounts'|'newaccount'
type Usuario = {
    id: number;
    name: string;
    emailPrincipal: string;
    password: string;
    secretWord: string;
    role: 'admin'|'user'|'turist'
}
type Cuenta = {
    userId: number;
    userName: string;
    userEmail: string;
    userPassword: string;
    serviceName: string;
    servicePassword: string;
    serviceUrl: string;
    serviceType: 'Otros' | 'no Otros';
    serviceDescription: string
}
export function useApi2 (solicitud : Solicitud, objeto : Usuario | Cuenta){
    const [data, setData] = useState<string | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [method, setMethod] = useState<string | null>(null)
    const [endpoint, setEndpoint] = useState<string>("")
    const [token,setToken] = useState<string | null>(null)


   switch (solicitud) {
    case 'login':
        setMethod("")
        setEndpoint("")
        break;
   
    case 'register':
        setMethod("")
        setEndpoint("")
        break;
   
    case 'edit':
        setMethod("")
        setEndpoint("")
        setToken("")
        break;
   
    case 'getuser':
        setMethod("")
        setEndpoint("")
        setToken("")
        break;
   
    case 'getaccounts':
        setMethod("")
        setEndpoint("")
        setToken("")
        break;
    case 'newaccount':
        setMethod("")
        setEndpoint("")
        setToken("")
        break;
   
   
    default:
        break;
   }

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
            const res = await fetch(endpoint,{
                method: method ? method : undefined,
                headers: {
                    'Content-Type': "application/json",
                    'Authorzation' : `Bearer ${token}`
                },
                body: objeto ? JSON.stringify(objeto) : undefined,
            });
            if(!res.ok){
                throw new Error(`Error ${res.status}: ${res.statusText}`);
            }
            const json = (await res.json()) as string
            setData(json);
        } catch(err){
            setError(err as Error)
        } 
        return {data, error}
        }
        fetchData()
    },[])
    return {data,error}
}
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
//crearemos un mapa de configuraciones:
const apiConfig: Record<Solicitud,{method: string, endpoint: string}> = {
    login:{ method: 'POST', endpoint: '/api/login'},
    register:{ method: 'POST', endpoint: '/api/register'},
    edit:{ method: 'PUT', endpoint: '/api/edit'},
    getuser:{ method: 'GET', endpoint: '/api/getuser'},
    getaccounts:{ method: 'GET', endpoint: '/api/getaccounts'},
    newaccount:{ method: 'POST', endpoint: '/api/newaccount'},
}
export function useApi3<T>(solicitud: Solicitud, body : Usuario | Cuenta){
    const [data,setData] = useState<T | null>(null);
    const [error,setError] = useState<Error | null>(null);
    const [loading,setLoading] = useState<boolean>(false);

    const fetchData = useCallback(async ()=>{
        const {method,endpoint} = apiConfig[solicitud]
        setLoading(true)
        setError(null)

        try {
            const res = await fetch(endpoint,{
                headers: {'Content-Type': 'application/json'},
                ...(body && {body: JSON.stringify(body)})
            })
            const json = await res.json();
            setData(json)
        } catch (error) {
            setError(error as Error)
        } finally{
            setLoading(false)
        }
    },[solicitud, body])
    return {data, error, loading}
}