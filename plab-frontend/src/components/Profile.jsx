import React from 'react'
import {
  Typography,
  Button,
  Avatar,
  Card,
  CardContent,
  Divider,
  IconButton,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProfileThunk } from '../features/pageSlice'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { getCreatedGamesThunk, deleteGameThunk } from '../features/gameSlice'

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
  const { games } = useSelector((state) => state.games)
  const fetchCreatedGamesData = useCallback(() => {
    dispatch(getCreatedGamesThunk())
      .unwrap()
      .then((result) => {})
      .catch((error) => {
        console.error(
          '매니저 본인이 생성한 게임 리스트 가져오는 중 오류 발생:',
          error
        )
        alert('매니저가 생성한 게임리스트 가져오기를 실패했습니다.', error)
      })
  }, [dispatch])

  useEffect(() => {
    fetchProfileData()
    if (user?.role === 'MANAGER') {
      // Added null check for user
      fetchCreatedGamesData()
    }
  }, [fetchProfileData, fetchCreatedGamesData, user?.role]) // Safeguard against user being null

  const onClickDelete = useCallback(
    (id) => {
      dispatch(deleteGameThunk(id))
        .unwrap()
        .then(() => {
          window.location.href = '/profile' //페이지 경로 이동
        })
        .catch((error) => {
          console.error('게임 삭제 중 오류 발생:', error)
          alert('게임 삭제 실패했습니다.', error)
        })
    },
    [dispatch]
  )
  console.log(games)
  return (
    <>
      {user && (
        <div>
          {/* fetch부터 해서 사람정보 가져오기 */}
          {/* Profile Section */}
          <Grid
            container
            spacing={2}
            style={{ marginTop: 20, padding: '0 20px' }}
          >
            <Grid item xs={12} sm={4} style={{ textAlign: 'center' }}>
              <Avatar style={{ width: 100, height: 100, margin: '0 auto' }} />
              <Typography variant='h6' style={{ marginTop: 10 }}>
                이름: {user.nick}
              </Typography>
              <Typography variant='body1'>이메일: {user.email}</Typography>
              <Typography variant='body1'>역할: {user.role}</Typography>
            </Grid>
          </Grid>

          {/* Application List */}
          <Card style={{ margin: '20px', padding: '10px' }}>
            <CardContent>
              {user.role === 'MANAGER' ? (
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  생성내역
                </Typography>
              ) : (
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  신청내역
                </Typography>
              )}
              {user.role === 'MANAGER' ? (
                <Link to='/gamecreate'>
                  <IconButton color='primary' aria-label='add' size='large'>
                    <AddCircleOutlineIcon fontSize='inherit' />
                  </IconButton>
                </Link>
              ) : (
                <></>
              )}

              {/* Application 1 */}
              {games.length > 0 ? (
                <>
                  {games.map((game) => (
                    <>
                      <Divider />
                      <Grid
                        container
                        spacing={2}
                        alignItems='center'
                        style={{ marginTop: 10 }}
                      >
                        <Grid item xs={2}>
                          <Typography variant='body1'>
                            {`${new Date(game.datetime).getFullYear()}년 ${
                              new Date(game.datetime).getMonth() + 1
                            }월 ${new Date(
                              game.datetime
                            ).getDate()}일 ${new Date(
                              game.datetime
                            ).getHours()}시`}
                            {/* {new Date(game.datetime).toLocaleDateString(
                              'en-CA'
                            )}
                            {new Date(game.datetime).toLocaleDateString()} */}
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant='body1'>
                            {game.Gym.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant='body1'>
                            주소 : {game.Gym.address}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          style={{ textAlign: 'right', marginBottom: 10 }}
                        >
                          <Link to={`/game/edit/${game.id}`}>
                            <Button variant='outlined' color='primary'>
                              수정하기
                            </Button>
                          </Link>
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          style={{ textAlign: 'right', marginBottom: 10 }}
                        >
                          <Button
                            variant='outlined'
                            color='error'
                            onClick={() => onClickDelete(game.id)}
                          >
                            게임 삭제
                          </Button>
                        </Grid>
                      </Grid>
                    </>
                  ))}
                  <Divider />
                </>
              ) : (
                <></>
              )}
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
      )}
    </>
  )
}

export default Profile
