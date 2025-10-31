import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App2.tsx'

import darkTheme from './themes/darkTheme.ts'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
