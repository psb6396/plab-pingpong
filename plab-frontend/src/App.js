import './styles/common.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { checkAuthStatusThunk } from './features/authSlice'
import ProfilePage from './pages/ProfilePage'
import GameCreatePage from './pages/GameCreatePage'
import GameEditPage from './pages/GameEditPage'
import GameDetailPage from './pages/GameDetailPage'

function App() {
   const dispatch = useDispatch()
   const { isAuthenticated, user } = useSelector((state) => state.auth)

   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])
   return (
      <>
         <Navbar isAuthenticated={isAuthenticated} user={user} />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage isAuthenticated={isAuthenticated} user={user} />} />
            <Route path="/gamecreate" element={<GameCreatePage />} />
            <Route path="/game/edit/:id" element={<GameEditPage />} />
            <Route path="/game/detail/:id" element={<GameDetailPage user={user} />} />
         </Routes>
      </>
   )
}

export default App
