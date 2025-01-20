import React, { useEffect } from 'react'
import { Box, Button, Typography, AppBar, Toolbar, Container, Paper, List, ListItem } from '@mui/material'
import GameDetail from '../components/GameDetail'
import { useParams } from 'react-router-dom'
import { fetchGameByIdThunk } from '../features/gameSlice'
import { useDispatch, useSelector } from 'react-redux'

const GameDetailPage = ({ user }) => {
   const { id } = useParams()
   const dispatch = useDispatch()

   const { game, loading, error } = useSelector((state) => state.games)

   useEffect(() => {
      dispatch(fetchGameByIdThunk(id))
   }, [dispatch, id])

   return (
      <>
         <GameDetail user={user} />
      </>
   )
}

export default GameDetailPage
