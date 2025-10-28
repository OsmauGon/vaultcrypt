import { useEffect, useState } from 'react'
import { encryptField } from '../utils/encription'
import {ejecutarSimulacro} from '../../public/loginProtocol'


type SubmitStatus = 'idle' | 'loading' | 'success' | 'error' | 'notfound'

interface UseFormSubmitOptions {
  encrypt?: boolean
  method: "PUT" | "PATCH" | "POST" | "GET"
  userKey?: string
  endpoint?: string
  onSuccess?: () => void
  onError?: () => void
}

export const useFormSubmit = <T extends Record<string, unknown>>({
  encrypt = false,
  method,
  userKey,
  endpoint,
  onSuccess,
  onError,
}: UseFormSubmitOptions) => {
  const [queryStatus, setQueryStatus] = useState<SubmitStatus>('idle')

  useEffect(() => {
    console.log('🔄 Estado actualizado:', queryStatus)
  }, [queryStatus])

  const submit = async (formData: T) => {
    let payload: Record<string, unknown> = { ...formData }

    if (encrypt && userKey) {
      payload = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => {
          if (typeof value === 'string') {
            return [key, encryptField(value, userKey)]
          }
          return [key, value]
        })
      )
    }

    console.log('📦 Payload listo para enviar:', payload)//Cambiar por "Nueva cuenta enviada"
    console.log('🛒 Lo vamos a enviar a ', endpoint)//borrar
    console.log('🛒 Con el metodo ', method)//borrar
    console.log('🧾 Datos originales:', formData)//borrar

    try {
      setQueryStatus('loading')
      await new Promise((res) => setTimeout(res, 3000)) // Simulación de envío

      // Simulación de fetch:
      // await fetch(endpoint!, {
      //   method: method,
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload),
      // }))

      
      const algo = endpoint?.split('/')[2] ? endpoint?.split('/')[2] : ""
      const endpoints :string[] =['login','register','edit']
      if(localStorage.getItem('vc-visit') && endpoints.includes(algo)) {//borrar cuando este terminado el backend
        //Este condicional es para que se simule el registro y logueo de un usuario
        //usanod el localStorage para simular el servidor y el sessionStorage para simular el token
        //Cuando el backend funcione correctamente debe ser borrado
        
        ejecutarSimulacro(algo, JSON.stringify(formData))

        if(algo === 'login' && !sessionStorage.getItem('vc-visit')) throw new Error
        
        window.location.href = '/'
      } 
      setQueryStatus('success')
      onSuccess?.()
    } catch (err) {
      console.error('❌ Error en el envío:', err)
      setQueryStatus('error')
      if(!sessionStorage.getItem("algo")) setQueryStatus('notfound')//borrar cuando este terminado el backend
      onError?.()
    } finally {
      setTimeout(() => setQueryStatus('idle'), 8000)
    }
  }

  return { submit, queryStatus }
}