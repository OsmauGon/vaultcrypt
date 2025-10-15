import { Container } from '@mui/material'
import type { ReactNode } from 'react'

type MainProps = {
  children: ReactNode
}

const Main = ({ children }: MainProps) => (
  //la etiqueta container usa flexGrow para tener todo el height disponible
    <Container
    component="main"
    sx={{
      flexGrow: 1,
      py: 4,
    }}
  >
    {children}
  </Container>

)

export default Main