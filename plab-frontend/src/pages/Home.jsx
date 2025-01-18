import { Container, Typography, Pagination, Stack, styled } from '@mui/material'

const Home = ({ isAuthenticated = {}, user = {} }) => {
  //생성된 게임 전체 fetch 할 예정 ㅇㅇㅇ
  return (
    <Container maxWidth='xs'>
      <div>
        <img src='./images/pingpong.jpg' alt='pingpong' />
      </div>
    </Container>
  )
}

export default Home
