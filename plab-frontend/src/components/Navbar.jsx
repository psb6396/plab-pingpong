import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { logoutUserThunk } from '../features/authSlice'

const Navbar = ({ isAuthenticated, user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = useCallback(() => {
    dispatch(logoutUserThunk())
      .unwrap()
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        alert(error)
      })
  }, [dispatch, navigate])
  return (
    <AppBar position='static' style={{ backgroundColor: '#fff' }}>
      <Toolbar>
        <Typography variant='h6' style={{ flexGrow: 1 }}>
          <Link to='/'>plab-pingpong</Link>
        </Typography>

        {isAuthenticated ? (
          <>
            {/* <Link to="/posts/create">내 프로필</Link> */}
            <Link to='/profile' style={{ textDecoration: 'none' }}>
              <Typography
                variant='body1'
                style={{ marginRight: '20px', color: 'black' }}
              >
                {/* ?(optional chaining): 값이 undefined 이거나 null일때 에러를 반환하지 않고 그냥 undefined를 반환 */}
                {user?.nick} 님 프로필
              </Typography>
            </Link>
            <Button onClick={handleLogout} variant='outlined'>
              로그아웃
            </Button>
          </>
        ) : (
          <Link to='/login'>
            <Button variant='contained'>로그인</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
