import React, { useEffect } from 'react'

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

   if (loading) return <p>로딩중</p>
   if (error) return <p>에러발생: {error}</p>
   return (
      <>
         <GameDetail user={user} game={game} />
      </>
   )
}

export default GameDetailPage
