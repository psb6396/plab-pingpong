// import {
//   TextField,
//   Button,
//   Container,
//   Typography,
//   CircularProgress,
// } from '@mui/material'
// import React, { useState, useMemo, useCallback } from 'react'
// import Box from '@mui/material/Box'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { loginUserThunk } from '../features/authSlice'

// const Login = () => {
//   const [email, setEmail] = useState('') // 이메일 상태
//   const [password, setPassword] = useState('') // 비밀번호 상태
//   const { loading, error } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const handleLogin = useCallback((e) => {
//     e.preventDefault()
//     if (email.trim() && password.trim()) {
//       dispatch(loginUserThunk({ email, password }))
//         .unwrap()
//         .then(() => navigate('/'))
//         .catch((error) => console.error('로그인실패:', error))
//     }
//   })
//   const loginButtonContent = useMemo(
//     () =>
//       loading ? (
//         <CircularProgress
//           size={24}
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//           }}
//         />
//       ) : (
//         '로그인'
//       ),
//     [loading]
//   ) //로딩상태가 변경될때만 버튼 내용이 다시 렌더링됨
//   return (
//     <Container maxWidth='sm' sx={{ marginTop: '80px' }}>
//       <Box
//         sx={{
//           backgroundColor: 'gray',
//           padding: '20px',
//           borderRadius: '8px',
//           // display: 'flex',
//           // flexDirection: 'column',
//           // justifyContent: 'flex-end',
//           // flexWrap: 'wrap',
//         }}
//       >
//         <form onSubmit={handleLogin}>
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'right',
//               // flexWrap: 'wrap',
//             }}
//           >
//             {/* 첫 번째 텍스트 필드 (이메일) */}
//             <TextField
//               sx={{
//                 backgroundColor: 'white',
//                 width: 'fit-content', // 전체 너비 사용
//                 marginBottom: '20px', // 아래 여백 추가
//               }}
//               label='이메일'
//               name='email'
//               margin='normal'
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             {/* 두 번째 텍스트 필드 (비밀번호) */}
//             <TextField
//               sx={{
//                 backgroundColor: 'white',
//                 width: 'fit-content', // 전체 너비 사용
//                 marginBottom: '20px', // 아래 여백 추가
//               }}
//               label='비밀번호'
//               type='password'
//               name='password'
//               margin='normal'
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             {/* 로그인 버튼 */}
//             <Box
//               sx={{
//                 // display: 'flex',
//                 // justifyContent: 'flex-end',
//                 marginTop: '20px',
//               }}
//             >
//               <p style={{ marginTop: '8px', marginRight: '10px' }}>
//                 계정이 없으신가요? <Link to='/signup'>회원가입</Link>
//               </p>
//               <Button
//                 variant='contained'
//                 color='primary'
//                 type='submit'
//                 disabled={loading}
//                 sx={{ position: 'relative' }}
//               >
//                 {loginButtonContent}
//               </Button>
//             </Box>
//           </Box>
//         </form>
//       </Box>
//     </Container>
//   )
// }

// export default Login

import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
} from '@mui/material'
import React, { useCallback, useState } from 'react'
import Box from '@mui/material/Box'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk } from '../features/authSlice'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector((state) => state.auth.loading) // Redux 상태로 로딩 상태 관리

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault()
      if (email.trim() && password.trim()) {
        dispatch(loginUserThunk({ email, password }))
          .unwrap()
          .then(() => navigate('/'))
          .catch((error) => console.error('로그인 실패:', error))
      }
    },
    [dispatch, navigate, email, password]
  )

  

  return (
    <Container maxWidth='sm' sx={{ marginTop: '80px' }}>
      <Box
        sx={{
          backgroundColor: 'gray',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <form onSubmit={handleLogin}>
          <Typography variant='h5' align='center' gutterBottom>
            로그인
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <TextField
              sx={{ backgroundColor: 'white', marginBottom: '20px' }}
              fullWidth
              label='이메일'
              name='email'
              margin='normal'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              sx={{ backgroundColor: 'white', marginBottom: '20px' }}
              fullWidth
              label='비밀번호'
              type='password'
              name='password'
              margin='normal'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Typography variant='body2' sx={{ marginBottom: '10px' }}>
              계정이 없으신가요?{' '}
              <Link
                to='/signup'
                style={{ textDecoration: 'none', color: 'blue' }}
              >
                회원가입
              </Link>
            </Typography>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={loading}
              sx={{ position: 'relative', height: '50px' }}
            >
              {loading ? <CircularProgress size={24} /> : '로그인'}
            </Button>
          </Box>
        </form>
        <Button onClick={}>
            구글로 로그인
        </Button>
      </Box>
    </Container>
  )
}

export default Login
