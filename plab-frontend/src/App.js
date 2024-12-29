import "./styles/common.css"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import Navbar from "./components/Navbar"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import { checkAuthStatusThunk } from "./features/authslice"
import ProfilePage from "./pages/ProfilePage"

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
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  )
}

export default App
