import { useEffect, useState } from 'react'
import { encryptField } from '../utils/encription'

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

interface UseFormSubmitOptions {
  encrypt?: boolean
  userKey?: string
  endpoint?: string
  onSuccess?: () => void
  onError?: () => void
}

export const useFormSubmit = ({
  encrypt = false,
  userKey,
  endpoint,
  onSuccess,
  onError,
}: UseFormSubmitOptions) => {
  const [queryStatus, setQueryStatus] = useState<SubmitStatus>('idle')

  useEffect(() => {
    //este useEffect es para ver cuando cambia el estado de la solicitud
    console.log('🔄 Estado actualizado:', queryStatus)
  }, [queryStatus])

  const submit = async (formData: Record<string, string>) => {
    let payload = { ...formData }

    if (encrypt && userKey) {
      payload = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          encryptField(value, userKey),
        ])
      )
    }

    console.log('📦 Payload listo para enviar:', payload)
    console.log('🛒 Lo vamos a enviar a ', endpoint)
    console.log('🧾 Datos originales:', formData)

    try {
      setQueryStatus('loading')
      await new Promise((res) => setTimeout(res, 3000)) // Simulación de envío

      // Simulación de fetch:
      // await fetch(endpoint!, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload),
      // })

      setQueryStatus('success')
      onSuccess?.()
    } catch (err) {
      console.error('❌ Error en el envío:', err)
      setQueryStatus('error')
      onError?.()
    } finally {
      setTimeout(() => setQueryStatus('idle'), 8000)
    }
  }

  return { submit, queryStatus }
}