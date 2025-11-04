import { Routes, Route } from 'react-router-dom'
import { MainLayout } from './layout/MainLayout'
import Home from './pages/Home'
import {Search} from './pages/Search'
import {Historial} from './pages/Historial'
import {Encrypt} from './pages/Encrypt2'
import Login from './pages/Login'
import EditPage4 from './pages/EditPage4'
import Register from './pages/Register'
import { UsuarioProvider } from './contextos/UsuarioProvider'
import {DemoPage} from './pages/DemoPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    
    <UsuarioProvider>
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/encrypt" element={<Encrypt />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit" element={<EditPage4 />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </MainLayout>
    </UsuarioProvider>
  )
}

export default App