import { Container, Typography, Pagination, Stack, styled } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGamesThunk } from '../features/gameSlice'

const Home = ({ isAuthenticated = {}, user = {} }) => {
  //생성된 게임 전체 fetch 할 예정 ㅇㅇㅇ

  return (
    <Container maxWidth='xs'>
      <div>
        <img src='./images/pingpong.jpg' alt='pingpong' />
      </div>
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
                  <Grid
                    container
                    spacing={2}
                    alignItems='center'
                    style={{ marginTop: 10 }}
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
                    <Grid
                      item='true'
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
                      item='true'
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
    </Container>
  )
}

export default Home
