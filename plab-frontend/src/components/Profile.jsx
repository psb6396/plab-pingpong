import React from 'react'
import {
  Typography,
  Button,
  Avatar,
  Card,
  CardContent,
  Divider,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProfileThunk } from '../features/pageSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.page)
  const fetchProfileData = useCallback(() => {
    dispatch(getProfileThunk())
      .unwrap()
      .then((result) => {})
      .catch((error) => {
        console.error('사용자 정보 가져오는 중 오류 발생:', error)
        alert('사용자 정보 가져오기를 실패했습니다.', error)
      })
  }, [dispatch])

  useEffect(() => {
    fetchProfileData()
  }, [fetchProfileData])
  return (
    <div>
      {/* fetch부터 해서 사람정보 가져오기 */}
      {/* Profile Section */}
      <Grid container spacing={2} style={{ marginTop: 20, padding: '0 20px' }}>
        <Grid item xs={12} sm={4} style={{ textAlign: 'center' }}>
          <Avatar style={{ width: 100, height: 100, margin: '0 auto' }} />
          <Typography variant='h6' style={{ marginTop: 10 }}>
            이름: {user.nick}
          </Typography>
          <Typography variant='body1'>이메일: {user.email}</Typography>
        </Grid>
      </Grid>

      {/* Application List */}
      <Card style={{ margin: '20px', padding: '10px' }}>
        <CardContent>
          <Typography variant='h6' style={{ marginBottom: 10 }}>
            신청내역
          </Typography>
          <Divider />

          {/* Application 1 */}
          <Grid
            container
            spacing={2}
            alignItems='center'
            style={{ marginTop: 10 }}
          >
            <Grid item xs={2}>
              <Typography variant='body1'>18:00</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant='body1'>인천 어디더디 체육관</Typography>
            </Grid>
            <Grid item xs={2} style={{ textAlign: 'right' }}>
              <Button variant='outlined' color='error'>
                취소
              </Button>
            </Grid>
          </Grid>

          <Divider style={{ margin: '10px 0' }} />

          {/* Application 2 */}
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={2}>
              <Typography variant='body1'>19:00</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant='body1'>서울 이런저런 체육관</Typography>
            </Grid>
            <Grid item xs={2} style={{ textAlign: 'right' }}>
              <Button variant='outlined' color='error'>
                취소
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Footer */}
      <footer
        style={{
          textAlign: 'center',
          padding: '10px',
          backgroundColor: '#e0e0e0',
          marginTop: 20,
        }}
      >
        <Typography variant='caption'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </footer>
    </div>
  )
}

export default Profile
