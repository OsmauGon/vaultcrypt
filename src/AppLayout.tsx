import Header from './layout/Header'
import Main from './layout/Main'
import Footer from './layout/Footer'
import type { ReactNode } from 'react'
import { Box } from '@mui/material'

type AppLayoutProps = {
  children: ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => (
  //metimos las etiquetas de layouts dentro de un Box para hacer que el componente main pueda tener todo el heigth disponible
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}
  >
    <Header />
    <Main>{children}</Main>
    <Footer />
  </Box>


)

export default AppLayout