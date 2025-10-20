import { Routes, Route } from 'react-router-dom'
import AppLayout from './AppLayout'
import Home from './pages/Home'
import Search from './pages/Search'
import Historial from './pages/Historial'
import Encrypt from './pages/Encrypt'
import Login from './pages/Login'
//import EditUser3 from './pages/EditPage3'
import EditPage4 from './pages/EditPage4'
import Register from './pages/Register'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/encrypt" element={<Encrypt />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit" element={<EditPage4 />} />
      </Routes>
    </AppLayout>
  )
}

export default App