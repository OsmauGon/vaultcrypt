import { Routes, Route } from 'react-router-dom'
import AppLayout from './AppLayout'
import Home from './pages/Home'
import Search from './pages/Search'
import Historial from './pages/Historial'
import Encrypt from './pages/Encrypt'
import Login from './pages/Login'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/encrypt" element={<Encrypt />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AppLayout>
  )
}

export default App