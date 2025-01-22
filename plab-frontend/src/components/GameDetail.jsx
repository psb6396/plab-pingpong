import React from 'react'
import { Box, Button, Typography, AppBar, Toolbar, Container, Paper, List, ListItem } from '@mui/material'

const GameDetail = ({ user = {}, game = {} }) => {
   return (
      <Box>
         {/* Main Content */}
         <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
               <Typography variant="h6" gutterBottom>
                  체육관 : {game ? game.Gym.name : ''}
               </Typography>
               {game ? (
                  <Typography variant="body1" gutterBottom>
                     날짜 및 시간 : <strong>{`${new Date(game.datetime).getFullYear()}년 ${new Date(game.datetime).getMonth() + 1}월 ${new Date(game.datetime).getDate()}일 ${new Date(game.datetime).getHours()}시`}</strong>
                  </Typography>
               ) : (
                  ''
               )}
               {game ? (
                  <Typography variant="body1" gutterBottom>
                     인원 : {game.currentPeople} / {game.maximumPeople}
                  </Typography>
               ) : (
                  ''
               )}

               <Typography variant="subtitle1" gutterBottom>
                  &lt;참가 인원 정보&gt;
               </Typography>
               <List>
                  <ListItem>1. 박세빈</ListItem>
                  <ListItem>2. 김철수</ListItem>
                  <ListItem>3. 김영희</ListItem>
               </List>
               <Button variant="contained" color="primary" fullWidth>
                  참가
               </Button>
            </Paper>
         </Container>
      </Box>
   )
}

export default GameDetail
