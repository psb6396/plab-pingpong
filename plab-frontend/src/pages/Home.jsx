import {
  Container,
  Typography,
  Button,
  Avatar,
  Card,
  CardContent,
  Divider,
  IconButton,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Link } from 'react-router-dom'

import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGamesThunk } from '../features/gameSlice'

const Home = ({ isAuthenticated = {}, user = {} }) => {
  //생성된 게임 전체 fetch 할 예정 ㅇㅇㅇ
  const dispatch = useDispatch()
  const { games, loading, error } = useSelector((state) => state.games)

  useEffect(() => {
    dispatch(fetchGamesThunk())
  }, [dispatch])
  console.log('games:', games)
  return (
    <>
      <Container maxWidth='xs'>
        <div>
          <img src='./images/pingpong.jpg' alt='pingpong' />
        </div>
      </Container>
      {/* Application List */}
      <Card style={{ margin: '20px', padding: '10px' }}>
        <CardContent>
          {/* {user.role === 'MANAGER' ? (
            <Typography variant='h6' style={{ marginBottom: 10 }}>
              생성내역
            </Typography>
          ) : (
            <Typography variant='h6' style={{ marginBottom: 10 }}>
              신청내역
            </Typography>
          )} */}
          {/* {user.role === 'MANAGER' ? (
            <Link to='/gamecreate'>
              <IconButton color='primary' aria-label='add' size='large'>
                <AddCircleOutlineIcon fontSize='inherit' />
              </IconButton>
            </Link>
          ) : (
            <></>
          )} */}

          {/* Application 1 */}
          {games.length > 0 ? (
            <>
              {games.map((game) => (
                <>
                  <Divider key={game.id} />
                  <Link to={`/game/detail/${game.id}`}>
                    <Grid
                      container
                      spacing={6}
                      alignItems='center'
                      justifyContent='center'
                      sx={{ my: 3 }}
                    >
                      <Grid item='true' xs={2}>
                        <Typography variant='body1'>
                          {`${new Date(game.datetime).getFullYear()}년 ${
                            new Date(game.datetime).getMonth() + 1
                          }월 ${new Date(game.datetime).getDate()}일 ${new Date(
                            game.datetime
                          ).getHours()}시`}
                        </Typography>
                      </Grid>
                      <Grid item='true' xs={8}>
                        <Typography variant='body1'>{game.Gym.name}</Typography>
                      </Grid>
                      <Grid item='true' xs={8}>
                        <Typography variant='body1'>
                          주소 : {game.Gym.address}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Link>
                </>
              ))}
              <Divider />
            </>
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default Home
