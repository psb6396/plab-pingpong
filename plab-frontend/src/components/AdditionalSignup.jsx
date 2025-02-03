import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
  FormControlLabel,
} from '@mui/material'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUserThunk } from '../features/authSlice'
import Checkbox from '@mui/material/Checkbox'

const AdditionalSignup = () => {
  const error = false

  //   return (
  //     <Container maxWidth='sm'>
  //       <Typography variant='h4' gutterBottom>
  //         회원가입
  //       </Typography>

  //       {error && (
  //         <Typography color='error' align='center'>
  //           {error}
  //         </Typography>
  //       )}

  //       <TextField
  //         label='이메일'
  //         variant='outlined'
  //         fullWidth
  //         margin='normal'
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //       />

  //       <TextField
  //         label='사용자 이름'
  //         variant='outlined'
  //         fullWidth
  //         margin='normal'
  //         value={nick}
  //         onChange={(e) => setNick(e.target.value)}
  //       />

  //       <TextField
  //         label='비밀번호'
  //         variant='outlined'
  //         type='password'
  //         fullWidth
  //         margin='normal'
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //       />

  //       <TextField
  //         label='비밀번호 확인'
  //         variant='outlined'
  //         type='password'
  //         fullWidth
  //         margin='normal'
  //         value={confirmPassword}
  //         onChange={(e) => setConfirmPassword(e.target.value)}
  //       />

  //       <FormControlLabel
  //         label='<= 매니저 지원 버튼'
  //         control={
  //           <Checkbox
  //             checked={managerChecked}
  //             onChange={(e) => setManagerChecked(e.target.checked)}
  //           />
  //         }
  //       />

  //       <Button
  //         variant='contained'
  //         color='primary'
  //         onClick={handleSignup}
  //         fullWidth
  //         disabled={loading}
  //         style={{ marginTop: '20px' }}
  //       >
  //         {loading ? <CircularProgress size={24} /> : '회원가입'}
  //       </Button>
  //     </Container>
  //   )
}

export default AdditionalSignup
