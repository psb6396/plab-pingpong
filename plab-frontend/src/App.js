import './styles/common.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'

function App() {
   //  const dispatch = useDispatch()
   //  const { isAuthenticated, user } = useSelector((state) => state.auth)

   //  useEffect(() => {
   //     dispatch()
   //  }, [dispatch])
   return (
      <>
         <Navbar isAuthenticated={null} user={null} />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
         </Routes>
      </>
   )
}

export default App
