import { Container, Typography, Pagination, Stack, styled } from '@mui/material'

const ImageWrap = styled.div`
   margin: 0 auto;
`

const Home = ({ isAuthenticated = {}, user = {} }) => {
   return (
      <Container maxWidth="xs">
         <ImageWrap>
            <img src="./images/pingpong.jpg" alt="pingpong" />
         </ImageWrap>
      </Container>
   )
}

export default Home
