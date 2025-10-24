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

    console.log('📦 Payload listo para enviar:', payload)
    console.log('🛒 Lo vamos a enviar a ', endpoint)
    console.log('🛒 Con el metodo ', method)
    console.log('🧾 Datos originales:', formData)

    try {
      setQueryStatus('loading')
      await new Promise((res) => setTimeout(res, 3000)) // Simulación de envío

      // Simulación de fetch:
      // await fetch(endpoint!, {
      //   method: method,
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload),
      // }))
      if(localStorage.getItem('vc-visit')) {//borrar cuando este terminado el backend
        const algo = endpoint?.split('/')[2] ? endpoint?.split('/')[2] : ""
        ejecutarSimulacro(algo, formData)
        window.location.href = '/'
        //throw new Error
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