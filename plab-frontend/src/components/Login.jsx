import { TextField, Button, Container, Typography, CircularProgress } from '@mui/material'
import React, { useState, useMemo, useCallback } from 'react'
import Box from '@mui/material/Box'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
   const [email, setEmail] = useState('') // 이메일 상태
   const [password, setPassword] = useState('') // 비밀번호 상태
   const loading = false
   return (
      <Container maxWidth="sm" sx={{ marginTop: '80px' }}>
         <Box
            sx={{
               backgroundColor: 'gray',
               padding: '20px',
               borderRadius: '8px',
            }}
         >
            <form>
               {/* 첫 번째 텍스트 필드 (이메일) */}
               <TextField
                  sx={{
                     backgroundColor: 'white',
                     display: 'block', // 블록 요소로 설정
                     width: 'fit-content', // 전체 너비 사용
                     marginBottom: '20px', // 아래 여백 추가
                  }}
                  label="이메일"
                  name="email"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />

               {/* 두 번째 텍스트 필드 (비밀번호) */}
               <TextField
                  sx={{
                     backgroundColor: 'white',
                     display: 'block', // 블록 요소로 설정
                     width: 'fit-content', // 전체 너비 사용
                     marginBottom: '20px', // 아래 여백 추가
                  }}
                  label="비밀번호"
                  type="password"
                  name="password"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />

               {/* 로그인 버튼 */}
               <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <p>
                     계정이 없으신가요? <Link to="/signup">회원가입</Link>
                  </p>
                  <Button variant="contained" color="primary" type="submit" disabled={loading} sx={{ position: 'relative' }}>
                     로그인
                  </Button>
               </Box>
            </form>
         </Box>
      </Container>
   )
}

export default Login
