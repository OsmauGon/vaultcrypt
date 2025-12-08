import { useState, useEffect } from 'react';
import { encryptField } from '../utils/encription';
import { useUsuario } from './useUsuario';
import { useNavigate } from 'react-router-dom';
import type { UsuarioLogueado } from '../contextos/UsuarioContext';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error' | 'notfound';
type SuccessData = {
  message: string;
  user: UsuarioLogueado;
  token: string;
}
interface UseFormSubmitOptions {
  encrypt?: boolean;
  method: "PUT" | "POST" | "GET";
  userKey?: string;
  endpoint: string;
  requiresAuth?: boolean;
  queryParams?: Record<string, string | number>; // Para parámetros de consulta
  onSuccess?: (data :SuccessData) => void;
  onError?: (error?: Error) => void;
}

// URL base de tu backend
const API_BASE_URL = 'https://maurix-bedmpvcc.vercel.app/api';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const useFormSubmit = <T extends Record<string, unknown>>({
  encrypt = false,
  method,
  userKey,
  endpoint,
  requiresAuth = false,
  queryParams,
  onSuccess,
  onError,
}: UseFormSubmitOptions) => {
  const navigate = useNavigate()
  const {setUsuario,setToken, logout} = useUsuario()
  const [queryStatus, setQueryStatus] = useState<SubmitStatus>('idle');

  useEffect(() => {
    console.log('🔄 Estado actualizado:', queryStatus);
  }, [queryStatus]);

  const submit = async (formData?: T) => {
    let payload: Record<string, unknown> = formData ? { ...formData } : {};
    if (encrypt && userKey && formData) {
      console.log("Aqui deberia encriptar los datos")
      payload = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => {
          if (typeof value === 'string' && (key === "userEmail" || key === "servicePassword" || key === "serviceDescription")) {
            return [key, encryptField(value, userKey)];
          }
          return [key, value];
        })
      );
    }
    try {
      setQueryStatus('loading');

      // Construir la URL con parámetros de consulta si existen
      let url = `${API_BASE_URL}${endpoint}`;
      
      if (queryParams && Object.keys(queryParams).length > 0) {
        const params = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
          params.append(key, value.toString());
        });
        url += `?${params.toString()}`;
      }

      // Configurar headers
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      // Agregar token si es requerido
      if (requiresAuth) {
        const token = localStorage.getItem('vc-token'); // obtenemos el token del localStorage
        if (!token) {
          throw new Error('No hay token de autenticación');
        }
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Configurar opciones de fetch
      const fetchOptions: RequestInit = {
        method: method,
        headers: headers,
        credentials: 'include', // Para manejar cookies si las usas
      };

      // Agregar body para métodos que no sean GET o si hay datos
      if (method !== 'GET' || (method === 'GET' && Object.keys(payload).length > 0)) {
        fetchOptions.body = JSON.stringify(payload);
      }

      console.log(`📤 Enviando ${method} a: ${url}`);
      /* mostrando el body SE PUEDE BORRAR
      if (fetchOptions.body) {
        console.log('📄 Body:', JSON.parse(fetchOptions.body as string));
      }
      */
     
      

      
      // Realizar la petición real con timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 100000); // 100 segundos timeout
      
      fetchOptions.signal = controller.signal;











      


      console.log(fetchOptions.body)
      const response = await fetch(url, fetchOptions);
      clearTimeout(timeoutId);

      // Verificar si la respuesta es OK
      if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // Si no se puede parsear JSON, usar el mensaje por defecto
        }

        if (response.status === 404) {
          setQueryStatus('notfound');
          throw new Error('Recurso no encontrado');
        } else if (response.status === 401 || response.status === 403) {
          // Token inválido, expirado o no autorizado
          localStorage.removeItem('vc-token');
          setQueryStatus('error');
          throw new Error('No autorizado - Por favor, inicia sesión nuevamente');
        } else if (response.status === 400) {
          setQueryStatus('error');
          throw new Error(`Datos inválidos: ${errorMessage}`);
        } else {
          setQueryStatus('error');
          throw new Error(errorMessage);
        }
      }

      // Procesar respuesta (algunos endpoints pueden no devolver JSON)
      let responseData;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      console.log('✅ Respuesta recibida:', responseData);

      setQueryStatus('success');
      onSuccess?.(responseData);
      if(responseData && responseData.user && responseData.token){
        //en caso de ser un login o un register exitoso
        setToken(responseData.token)
        setUsuario(responseData.user)
        localStorage.setItem('vc-token',responseData.token)
      }
      if(responseData.message === "Usuario actualizado con exito"){
        //en caso de ser un edit de usuario exitoso
        alert("Por favor inicie sesion")
        logout()
        navigate('/')
      }

      return responseData;
    
    } catch (err: unknown) {
  console.error("❌ Error en el envío:", err);

  // Narrowing: verificamos si es instancia de Error
  if (err instanceof Error) {
    if (err.name === "AbortError") {
      err.message = "La solicitud tardó demasiado tiempo. Intenta nuevamente.";
    }

    // Determinar el tipo de error
    if (err.message === "No hay token de autenticación") {
      setQueryStatus("error");
    } else if (err.message.includes("no encontrado") || err.message.includes("404")) {
      setQueryStatus("notfound");
    } else {
      setQueryStatus("error");
    }

    onError?.(err);
    throw err;
  } else {
    // Si no es Error, lo tratamos como un caso inesperado
    setQueryStatus("error");
    onError?.(new Error("Error desconocido"));
    throw new Error("Error desconocido");
  }
    } finally {
      setTimeout(() => setQueryStatus('idle'), 8000);
    }
  };

  return { submit, queryStatus };
};